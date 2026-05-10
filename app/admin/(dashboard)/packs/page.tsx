import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = { title: 'Packs' };

export default async function AdminPacksPage() {
  let packs: { id: string; name: string; price_label: string; featured: boolean; published: boolean; order: number }[] = [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('packs').select('id, name, price_label, featured, published, order').order('order');
    packs = data || [];
  } catch { /* ignore */ }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-gray-900">Packs</h1>
          <p className="text-gray-500 text-sm mt-1">{packs.length} pack{packs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/packs/nouveau" className="bg-bordeaux text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-bordeaux-dark transition-colors">
          + Nouveau pack
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {packs.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-4xl block mb-3">📦</span>
            <p className="text-gray-500 text-sm mb-4">Aucun pack. Créez votre premier pack.</p>
            <Link href="/admin/packs/nouveau" className="text-bordeaux text-sm font-medium hover:underline">Créer un pack →</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Pack</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Prix</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Statut</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {packs.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{p.name}</p>
                    {p.featured && <span className="text-xs text-or font-medium">⭐ En vedette</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{p.price_label}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/packs/${p.id}`} className="text-bordeaux text-xs font-medium hover:underline">Modifier</Link>
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
