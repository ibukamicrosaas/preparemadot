import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators';
import { rateLimit, validateOrigin } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  if (!validateOrigin(req)) {
    return NextResponse.json(
      { success: false, message: 'Requête non autorisée.' },
      { status: 403 }
    );
  }

  const rl = rateLimit(req, { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, message: 'Trop de messages. Veuillez réessayer plus tard.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Données invalides. Vérifiez les champs obligatoires.' },
        { status: 400 }
      );
    }

    const data = result.data;

    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Prepare Ma Dot <noreply@preparemadot.com>',
          to: [process.env.CONTACT_EMAIL],
          subject: `Message de contact — ${data.name}`,
          html: `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#FFF9F0">
              <h1 style="font-family:Georgia,serif;color:#3A111A;font-size:24px;margin-bottom:24px">Nouveau message de contact</h1>
              <p><strong>Nom :</strong> ${data.name}</p>
              <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <div style="background:#F5EBDD;border-radius:12px;padding:16px;margin-top:16px">
                <p style="color:#2F1E1A;font-size:14px;line-height:1.6;margin:0">${data.message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.error('[contact] Email send failed:', err instanceof Error ? err.message : err);
      }
    }

    return NextResponse.json({ success: true, message: 'Message envoyé.' });
  } catch (err) {
    console.error('[contact] Unexpected error:', err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
