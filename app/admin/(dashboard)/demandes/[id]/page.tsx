'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

const statusOptions = [
  { value: 'new', label: 'Nouveau' },
  { value: 'contacted', label: 'Contacté' },
  { value: 'quote_sent', label: 'Devis envoyé' },
  { value: 'converted', label: 'Converti' },
  { value: 'lost', label: 'Perdu' },
];

const needTypeLabels: Record<string, string> = {
  products_only: 'Acheter des produits', list_help: 'Aide pour la liste',
  complete_pack: 'Pack complet', remote_organization: 'Organisation à distance',
  advice: 'Conseil', other: 'Autre',
};

type Demande = {
  id: string; full_name: string; email: string; whatsapp: string;
  residence_country?: string; target_city?: string; culture_or_country?: string;
  ceremony_date?: string; estimated_budget?: string; need_type: string;
  has_existing_list?: string; message?: string; status: string;
  admin_notes?: string; created_at: string;
};

export default function DemandeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [demande, setDemande] = useState<Demande | null>(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.from('custom_requests').select('*').eq('id', id).single()
      .then(({ data }: { data: Demande | null }) => {
        if (data) { setDemande(data); setStatus(data.status); setNotes(data.admin_notes || ''); }
      });
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    const supabase = getSupabaseBrowserClient();
    await supabase.from('custom_requests').update({ status, admin_notes: notes }).eq('id', id);
    setSaving(false);
    router.refresh();
  };

  if (!demande) return <div className="p-8 text-gray-400">Chargement…</div>;

  const Row = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <div className="flex gap-4 py-3 border-b border-gray-50 last:border-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-40 shrink-0">{label}</span>
        <span className="text-sm text-gray-700">{value}</span>
      </div>
    ) : null;

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/demandes" className="text-gray-400 hover:text-gray-700 text-sm">← Demandes</Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-semibold text-gray-900">{demande.full_name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Détails */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 text-sm mb-4">Informations du client</h2>
            <Row label="Nom" value={demande.full_name} />
            <Row label="Email" value={demande.email} />
            <Row label="WhatsApp" value={demande.whatsapp} />
            <Row label="Pays résidence" value={demande.residence_country} />
            <Row label="Ville cible" value={demande.target_city} />
            <Row label="Culture / pays" value={demande.culture_or_country} />
            <Row label="Date cérémonie" value={demande.ceremony_date ? new Date(demande.ceremony_date).toLocaleDateString('fr-FR') : undefined} />
            <Row label="Budget estimé" value={demande.estimated_budget} />
            <Row label="Besoin" value={needTypeLabels[demande.need_type] || demande.need_type} />
            <Row label="Liste existante" value={demande.has_existing_list === 'yes' ? 'Oui' : demande.has_existing_list === 'no' ? 'Non' : 'Partielle'} />
            <Row label="Reçu le" value={new Date(demande.created_at).toLocaleString('fr-FR')} />
          </div>
          {demande.message && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 text-sm mb-3">Message</h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{demande.message}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">Gestion</h2>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Statut</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm">
                {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Notes internes</label>
              <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none" placeholder="Ajouter des notes…" />
            </div>
            <button onClick={handleSave} disabled={saving} className="w-full bg-bordeaux text-white font-semibold text-sm py-3 rounded-full hover:bg-bordeaux-dark disabled:opacity-50 transition-colors">
              {saving ? 'Sauvegarde…' : 'Sauvegarder'}
            </button>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Actions rapides</h2>
            <a href={`https://wa.me/${demande.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-[#25D366] hover:underline">
              <span>💬</span> Contacter sur WhatsApp
            </a>
            <a href={`mailto:${demande.email}`} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
              <span>📧</span> Envoyer un email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
