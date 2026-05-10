import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import BlogPostForm from '@/components/admin/BlogPostForm';
import Link from 'next/link';

export const metadata = { title: 'Modifier l\'article' };

type Params = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Params) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (!post) notFound();

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="text-gray-400 hover:text-gray-700 text-sm">← Blog</Link>
        <span className="text-gray-300">/</span>
        <h1 className="font-serif text-2xl font-semibold text-gray-900">{post.title}</h1>
      </div>
      <BlogPostForm mode="edit" initialData={{ ...post, cover_image_url: post.cover_image_url || '' }} />
    </div>
  );
}
