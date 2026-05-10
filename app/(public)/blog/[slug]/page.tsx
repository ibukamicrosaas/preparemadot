import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import CTASection from '@/components/sections/CTASection';

export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('blog_posts').select('title, excerpt, seo_title, seo_description').eq('slug', slug).eq('status', 'published').single();
  if (!data) return {};
  return {
    title: data.seo_title || data.title,
    description: data.seo_description || data.excerpt || '',
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogArticlePage({ params }: Params) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: post } = await supabase.from('blog_posts').select('*').eq('slug', slug).eq('status', 'published').single();
  if (!post) notFound();

  return (
    <>
      {/* Hero article */}
      <section className="bg-bordeaux-dark py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-beige/40 mb-6 flex items-center gap-2">
            <Link href="/blog" className="hover:text-beige/70">Blog</Link>
            <span>›</span>
            <span className="text-or">{post.category}</span>
          </nav>
          <span className="text-xs font-semibold text-or tracking-widest uppercase block mb-4">{post.category}</span>
          <h1 className="font-serif text-3xl md:text-5xl text-ivoire font-semibold leading-tight mb-5">
            {post.title}
          </h1>
          {post.published_at && (
            <p className="text-beige/50 text-sm">
              Publié le {new Date(post.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* Image de couverture */}
      {post.cover_image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-0 relative z-10">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
            <Image src={post.cover_image_url} alt={post.title} width={1200} height={675} className="w-full h-full object-cover" unoptimized />
          </div>
        </div>
      )}

      {/* Contenu */}
      <section className="py-14 md:py-20 bg-ivoire">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.excerpt && (
            <p className="text-brun-light text-lg md:text-xl leading-relaxed mb-10 font-medium border-l-4 border-or pl-5">
              {post.excerpt}
            </p>
          )}
          {post.content && (
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-bordeaux-dark prose-p:text-brun-light prose-p:leading-relaxed prose-li:text-brun-light prose-strong:text-brun"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          {/* Retour blog */}
          <div className="mt-14 pt-8 border-t border-beige/60 flex items-center justify-between">
            <Link href="/blog" className="text-sm font-medium text-bordeaux hover:underline">
              ← Retour au blog
            </Link>
            <Link href="/demande-personnalisee" className="text-sm font-semibold bg-bordeaux text-ivoire px-6 py-2.5 rounded-full hover:bg-bordeaux-dark transition-colors">
              Préparer ma dot
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Cet article vous a été utile ?"
        subtitle="Nos experts sont là pour vous accompagner dans la préparation de votre dot."
        ctaLabel="Faire une demande personnalisée"
        ctaHref="/demande-personnalisee"
        secondaryLabel="Écrire sur WhatsApp"
      />
    </>
  );
}
