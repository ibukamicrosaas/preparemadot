import { createSupabaseServerClient } from '@/lib/supabase/server';
import { packs as staticPacks } from '@/data/packs';
import type { ServicePack } from '@/data/types';

function mapRow(row: Record<string, unknown>): ServicePack {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    shortDescription: (row.short_description as string) || '',
    description: (row.description as string) || '',
    inclusions: (row.inclusions as string[]) || [],
    priceLabel: (row.price_label as string) || 'Sur devis',
    featured: row.featured as boolean | undefined,
    highlight: row.highlight as string | undefined,
    ctaLabel: (row.cta_label as string) || 'Demander ce pack',
    order: (row['order'] as number) || 0,
  };
}

export async function getAllPacks(): Promise<ServicePack[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return staticPacks;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from('packs').select('*').eq('published', true).order('order');
    if (error || !data?.length) return staticPacks;
    return data.map(mapRow);
  } catch { return staticPacks; }
}
