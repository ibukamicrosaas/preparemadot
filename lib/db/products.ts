import { createSupabaseServerClient } from '@/lib/supabase/server';
import { products as staticProducts, getProductBySlug as staticGetBySlug } from '@/data/products';
import type { Product } from '@/data/types';

function mapRow(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    category: row.category_slug as Product['category'],
    shortDescription: (row.short_description as string) || '',
    description: row.description as string | undefined,
    price: row.price as number | undefined,
    priceLabel: row.price_label as string | undefined,
    isPriceOnRequest: row.is_price_on_request as boolean | undefined,
    availability: row.availability as Product['availability'],
    images: (row.images as string[]) || [],
    featured: row.featured as boolean | undefined,
    order: row['order'] as number | undefined,
    seoTitle: row.seo_title as string | undefined,
    seoDescription: row.seo_description as string | undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return staticProducts;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('published', true)
      .order('order');
    if (error || !data?.length) return staticProducts;
    return data.map(mapRow);
  } catch { return staticProducts; }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return staticGetBySlug(slug);
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).eq('published', true).single();
    if (error || !data) return staticGetBySlug(slug);
    return mapRow(data);
  } catch { return staticGetBySlug(slug); }
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { getFeaturedProducts: staticFeatured } = await import('@/data/products');
    return staticFeatured(limit);
  }
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from('products').select('*').eq('published', true).eq('featured', true).order('order').limit(limit);
    if (error || !data?.length) {
      const { getFeaturedProducts: staticFeatured } = await import('@/data/products');
      return staticFeatured(limit);
    }
    return data.map(mapRow);
  } catch {
    const { getFeaturedProducts: staticFeatured } = await import('@/data/products');
    return staticFeatured(limit);
  }
}
