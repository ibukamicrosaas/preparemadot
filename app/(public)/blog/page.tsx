import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Blog — Traditions, conseils et inspiration',
  description: 'Découvrez nos articles sur la dot africaine : traditions, conseils pratiques et inspiration pour préparer votre cérémonie.',
  alternates: { canonical: '/blog' },
};

export const revalidate = 3600;

async function getPosts() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, category, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    return data || [];
  } catch { return []; }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="bg-bordeaux-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-or/20 border border-or/30 text-or text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Notre blog
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-ivoire font-semibold leading-tight mb-4">
            Traditions, conseils & inspiration
          </h1>
          <p className="text-beige/70 text-lg leading-relaxed max-w-xl mx-auto">
            Tout ce qu&apos;il faut savoir sur la dot africaine — traditions, préparation, conseils pratiques et histoires inspirantes.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-ivoire">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-4xl block mb-4">✍️</span>
              <p className="text-brun-light text-base">Les premiers articles arrivent bientôt.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-beige rounded-2xl overflow-hidden group hover:shadow-md transition-shadow">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-video bg-bordeaux/10 flex items-center justify-center overflow-hidden">
                      {post.cover_image_url ? (
                        <Image src={post.cover_image_url} alt={post.title} width={400} height={225} className="w-full h-full object-cover" unoptimized />
                      ) : (
                        <span className="text-5xl">📖</span>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-or uppercase tracking-wide">{post.category}</span>
                      {post.published_at && (
                        <span className="text-xs text-brun-light/50">· {new Date(post.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="font-serif text-bordeaux-dark text-xl font-semibold leading-snug mb-3 group-hover:text-bordeaux transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="text-brun-light text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                    )}
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-bordeaux text-sm font-medium mt-4 hover:underline">
                      Lire l&apos;article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
