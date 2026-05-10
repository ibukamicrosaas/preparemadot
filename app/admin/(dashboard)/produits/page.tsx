import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = { title: 'Produits' };

async function getProducts() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('products')
      .select('id, name, category_slug, availability, published, featured, created_at')
      .order('created_at', { ascending: false });
    return data || [];
  } catch { return []; }
}

const availabilityLabels: Record<string, string> = {
  available: 'Disponible', unavailable: 'Indisponible', on_request: 'Sur commande',
};

export default async function AdminProduitsPage() {
  const products = await getProducts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-gray-900">Produits</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} produit{products.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="bg-bordeaux text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-bordeaux-dark transition-colors"
        >
          + Nouveau produit
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {products.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-4xl block mb-3">🛍️</span>
            <p className="text-gray-500 text-sm mb-4">Aucun produit. Commencez par en créer un.</p>
            <Link href="/admin/produits/nouveau" className="text-bordeaux text-sm font-medium hover:underline">
              Créer le premier produit →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Produit</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Catégorie</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Statut</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Dispo</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-900">{p.name}</p>
                        {p.featured && <span className="text-xs text-or font-medium">⭐ En vedette</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{p.category_slug || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {availabilityLabels[p.availability] || p.availability}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/produits/${p.id}`} className="text-bordeaux text-xs font-medium hover:underline">
                      Modifier
                    </Link>
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
