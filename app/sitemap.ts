import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { getAllProducts } from '@/lib/db/products';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { products as staticProducts } from '@/data/products';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticPages = [
    { url: `${base}/`, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/comment-ca-marche`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/boutique`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/packs`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/demande-personnalisee`, priority: 1.0, changeFrequency: 'monthly' as const },
    { url: `${base}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/a-propos`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: 'monthly' as const },
    // Pages légales exclues du sitemap (robots: index:false)
  ];

  const products = await getAllProducts().catch(() => staticProducts);
  const productPages = products.map((p) => ({
    url: `${base}/boutique/${p.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('blog_posts').select('slug, published_at').eq('status', 'published');
    blogPages = (data || []).map((p) => ({
      url: `${base}/blog/${p.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: p.published_at ? new Date(p.published_at) : undefined,
    }));
  } catch { /* ignore */ }

  return [...staticPages, ...productPages, ...blogPages];
}
