import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import PackForm from '@/components/admin/PackForm';
import Link from 'next/link';

export const metadata = { title: 'Modifier le pack' };

type Params = { params: Promise<{ id: string }> };

export default async function EditPackPage({ params }: Params) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: pack } = await supabase.from('packs').select('*').eq('id', id).single();
  if (!pack) notFound();

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/packs" className="text-gray-400 hover:text-gray-700 text-sm">← Packs</Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-semibold text-gray-900">{pack.name}</h1>
      </div>
      <PackForm mode="edit" initialData={{ ...pack, price: pack.price ? String(pack.price) : '', highlight: pack.highlight || '', image_url: pack.image_url || '' }} />
    </div>
  );
}
