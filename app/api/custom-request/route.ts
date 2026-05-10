import { NextRequest, NextResponse } from 'next/server';
import { customRequestSchema } from '@/lib/validators';
import { rateLimit, validateOrigin } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // Validation de l'origine (protection CSRF)
  if (!validateOrigin(req)) {
    return NextResponse.json(
      { success: false, message: 'Requête non autorisée.' },
      { status: 403 }
    );
  }

  // Rate limiting : 5 demandes par heure par IP
  const rl = rateLimit(req, { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, message: 'Trop de demandes. Veuillez réessayer dans une heure.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    // Validation serveur (Zod)
    const result = customRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Données invalides. Vérifiez les champs obligatoires.' },
        { status: 400 }
      );
    }

    const data = result.data;

    // Stocker en Supabase
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        await supabase.from('custom_requests').insert({
          full_name: data.fullName,
          email: data.email,
          whatsapp: data.whatsapp,
          residence_country: data.residenceCountry || null,
          target_city: data.targetCity || null,
          culture_or_country: data.cultureOrCountry || null,
          ceremony_date: data.ceremonyDate || null,
          estimated_budget: data.estimatedBudget || null,
          need_type: data.needType,
          has_existing_list: data.hasExistingList || null,
          message: data.message || null,
          consent_to_contact: data.consentToContact,
          status: 'new',
        });
      } catch (err) {
        console.error('[custom-request] Supabase insert failed:', err instanceof Error ? err.message : err);
      }
    }

    // Notification email via Resend
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Prepare Ma Dot <noreply@preparemadot.com>',
          to: [process.env.CONTACT_EMAIL],
          subject: `Nouvelle demande de dot — ${data.fullName}`,
          html: buildEmailHtml(data),
        });
      } catch (err) {
        console.error('[custom-request] Email send failed:', err instanceof Error ? err.message : err);
      }
    }

    return NextResponse.json({ success: true, message: 'Votre demande a bien été envoyée.' });
  } catch (err) {
    console.error('[custom-request] Unexpected error:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

function buildEmailHtml(data: {
  fullName: string; email: string; whatsapp: string;
  residenceCountry?: string; targetCity?: string; cultureOrCountry?: string;
  ceremonyDate?: string; estimatedBudget?: string; needType: string;
  hasExistingList?: string; message?: string;
}): string {
  const needTypeLabels: Record<string, string> = {
    products_only: 'Acheter des produits spécifiques', list_help: 'Aide pour composer la liste',
    complete_pack: 'Obtenir un pack complet', remote_organization: 'Organiser à distance',
    advice: 'Conseil et orientation', other: 'Autre',
  };
  const hasListLabels: Record<string, string> = { yes: 'Oui', no: 'Non', not_sure: 'Pas encore complète' };
  const row = (label: string, value?: string) =>
    value ? `<tr><td style="padding:8px 0;color:#5C3D35;font-size:14px;font-weight:600;width:180px;vertical-align:top">${label}</td><td style="padding:8px 0;color:#2F1E1A;font-size:14px">${value}</td></tr>` : '';

  return `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#FFF9F0">
      <h1 style="font-family:Georgia,serif;color:#3A111A;font-size:28px;font-weight:600;margin-bottom:8px">Nouvelle demande de dot</h1>
      <p style="color:#C8A24A;font-size:14px;margin-bottom:32px">Prepare Ma Dot — Demande personnalisée</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        ${row('Nom complet', data.fullName)}
        ${row('Email', data.email)}
        ${row('WhatsApp', data.whatsapp)}
        ${row('Pays de résidence', data.residenceCountry)}
        ${row('Ville cible', data.targetCity)}
        ${row('Culture / pays dot', data.cultureOrCountry)}
        ${row('Date cérémonie', data.ceremonyDate)}
        ${row('Budget', data.estimatedBudget)}
        ${row('Besoin principal', needTypeLabels[data.needType] || data.needType)}
        ${row('Liste disponible', data.hasExistingList ? hasListLabels[data.hasExistingList] : undefined)}
      </table>
      ${data.message ? `<div style="background:#F5EBDD;border-radius:12px;padding:16px;margin-bottom:24px"><p style="color:#5C3D35;font-size:13px;font-weight:600;margin-bottom:8px">Message</p><p style="color:#2F1E1A;font-size:14px;line-height:1.6;margin:0">${data.message.replace(/\n/g, '<br>')}</p></div>` : ''}
      <div style="background:#6E1F2F;border-radius:12px;padding:16px;text-align:center">
        <a href="https://wa.me/${data.whatsapp.replace(/\D/g, '')}" style="color:#C8A24A;font-size:14px;font-weight:600;text-decoration:none">Contacter sur WhatsApp →</a>
      </div>
    </div>
  `;
}
