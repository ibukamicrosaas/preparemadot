import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = { title: 'Demandes' };

const statusLabels: Record<string, string> = {
  new: 'Nouveau', contacted: 'Contacté', quote_sent: 'Devis envoyé', converted: 'Converti', lost: 'Perdu',
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700', contacted: 'bg-yellow-50 text-yellow-700',
  quote_sent: 'bg-purple-50 text-purple-700', converted: 'bg-green-50 text-green-700',
  lost: 'bg-gray-100 text-gray-500',
};

const needTypeLabels: Record<string, string> = {
  products_only: 'Produits', list_help: 'Liste', complete_pack: 'Pack complet',
  remote_organization: 'À distance', advice: 'Conseil', other: 'Autre',
};

export default async function AdminDemandesPage() {
  let demandes: { id: string; full_name: string; whatsapp: string; need_type: string; status: string; created_at: string; ceremony_date?: string }[] = [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('custom_requests')
      .select('id, full_name, whatsapp, need_type, status, created_at, ceremony_date')
      .order('created_at', { ascending: false });
    demandes = data || [];
  } catch { /* ignore */ }

  const byStatus = (s: string) => demandes.filter((d) => d.status === s).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-gray-900">Demandes personnalisées</h1>
        <p className="text-gray-500 text-sm mt-1">{demandes.length} demande{demandes.length !== 1 ? 's' : ''} au total</p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {Object.entries(statusLabels).map(([key, label]) => (
          <div key={key} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-900">{byStatus(key)}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {demandes.length === 0 ? (
          <div className="py-16 text-center"><p className="text-gray-400 text-sm">Aucune demande reçue</p></div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Client</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Besoin</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Cérémonie</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Statut</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {demandes.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{d.full_name}</p>
                    <a href={`https://wa.me/${d.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#25D366] hover:underline">{d.whatsapp}</a>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{needTypeLabels[d.need_type] || d.need_type}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{d.ceremony_date ? new Date(d.ceremony_date).toLocaleDateString('fr-FR') : '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[d.status] || 'bg-gray-100'}`}>
                      {statusLabels[d.status] || d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/demandes/${d.id}`} className="text-bordeaux text-xs font-medium hover:underline">Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
