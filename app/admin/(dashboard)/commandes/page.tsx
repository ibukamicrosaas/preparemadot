import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = { title: 'Commandes' };

const statusLabels: Record<string, string> = {
  pending: 'En attente', confirmed: 'Confirmé', in_progress: 'En cours',
  ready: 'Prêt', delivered: 'Livré', cancelled: 'Annulé',
};

const statusColors: Record<string, string> = {
  pending: 'bg-orange-50 text-orange-700', confirmed: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-yellow-50 text-yellow-700', ready: 'bg-purple-50 text-purple-700',
  delivered: 'bg-green-50 text-green-700', cancelled: 'bg-gray-100 text-gray-500',
};

export default async function AdminCommandesPage() {
  let orders: { id: string; full_name: string; whatsapp: string; status: string; created_at: string; items: unknown[] }[] = [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('orders').select('id, full_name, whatsapp, status, created_at, items').order('created_at', { ascending: false });
    orders = data || [];
  } catch { /* ignore */ }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-gray-900">Commandes</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} commande{orders.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-16 text-center"><p className="text-gray-400 text-sm">Aucune commande</p></div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Client</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Articles</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Statut</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{o.full_name}</p>
                    <a href={`https://wa.me/${o.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#25D366] hover:underline">{o.whatsapp}</a>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{Array.isArray(o.items) ? o.items.length : 0} article{(Array.isArray(o.items) && o.items.length > 1) ? 's' : ''}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[o.status] || 'bg-gray-100'}`}>
                      {statusLabels[o.status] || o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{new Date(o.created_at).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/commandes/${o.id}`} className="text-bordeaux text-xs font-medium hover:underline">Voir</Link>
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
