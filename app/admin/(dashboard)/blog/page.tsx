import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const metadata = { title: 'Blog' };

export default async function AdminBlogPage() {
  let posts: { id: string; title: string; category: string; status: string; created_at: string }[] = [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('blog_posts').select('id, title, category, status, created_at').order('created_at', { ascending: false });
    posts = data || [];
  } catch { /* ignore */ }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-gray-900">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/admin/blog/nouveau" className="bg-bordeaux text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-bordeaux-dark transition-colors">
          + Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <span className="text-4xl block mb-3">✍️</span>
            <p className="text-gray-500 text-sm mb-4">Aucun article. Commencez à écrire.</p>
            <Link href="/admin/blog/nouveau" className="text-bordeaux text-sm font-medium hover:underline">Écrire le premier article →</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Titre</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Catégorie</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Statut</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.title}</td>
                  <td className="px-6 py-4 text-gray-500">{p.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{new Date(p.created_at).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/blog/${p.id}`} className="text-bordeaux text-xs font-medium hover:underline">Modifier</Link>
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
