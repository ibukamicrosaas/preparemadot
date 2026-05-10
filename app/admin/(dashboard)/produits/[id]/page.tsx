import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

export const metadata = { title: 'Modifier le produit' };

type Params = { params: Promise<{ id: string }> };

export default async function EditProduitPage({ params }: Params) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*').eq('id', id).single(),
    supabase.from('categories').select('slug, name').order('order'),
  ]);

  if (!product) notFound();

  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    category_slug: product.category_slug || '',
    short_description: product.short_description || '',
    description: product.description || '',
    price: product.price ? String(product.price) : '',
    price_label: product.price_label || 'Sur devis',
    is_price_on_request: product.is_price_on_request ?? true,
    availability: product.availability,
    images: product.images || [],
    featured: product.featured || false,
    published: product.published ?? true,
    seo_title: product.seo_title || '',
    seo_description: product.seo_description || '',
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/produits" className="text-gray-400 hover:text-gray-700 text-sm">← Produits</Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-semibold text-gray-900">{product.name}</h1>
      </div>
      <ProductForm categories={categories || []} initialData={initialData} mode="edit" />
    </div>
  );
}
