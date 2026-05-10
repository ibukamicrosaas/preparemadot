import PackForm from '@/components/admin/PackForm';
import Link from 'next/link';

export const metadata = { title: 'Nouveau pack' };

export default function NouveauPackPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/packs" className="text-gray-400 hover:text-gray-700 text-sm">← Packs</Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-semibold text-gray-900">Nouveau pack</h1>
      </div>
      <PackForm mode="create" />
    </div>
  );
}
