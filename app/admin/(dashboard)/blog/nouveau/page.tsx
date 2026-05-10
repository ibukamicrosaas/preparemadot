import BlogPostForm from '@/components/admin/BlogPostForm';
import Link from 'next/link';

export const metadata = { title: 'Nouvel article' };

export default function NouvelArticlePage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="text-gray-400 hover:text-gray-700 text-sm">← Blog</Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-semibold text-gray-900">Nouvel article</h1>
      </div>
      <BlogPostForm mode="create" />
    </div>
  );
}
