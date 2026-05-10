import { createSupabaseServerClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

export const metadata = { title: 'Nouveau produit' };

async function getCategories() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('categories').select('slug, name').order('order');
    return data || [];
  } catch { return []; }
}

export default async function NouveauProduitPage() {
  const categories = await getCategories();
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/produits" className="text-gray-400 hover:text-gray-700 text-sm">← Produits</Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-semibold text-gray-900">Nouveau produit</h1>
      </div>
      <ProductForm categories={categories} mode="create" />
    </div>
  );
}
