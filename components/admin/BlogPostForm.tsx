'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

type PostData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  status: 'draft' | 'published';
  seo_title: string;
  seo_description: string;
};

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const categories = ['Traditions', 'Conseils', 'Cultures', 'Inspiration', 'Actualités'];

const defaultData: PostData = {
  title: '', slug: '', excerpt: '', content: '', cover_image_url: '',
  category: 'Traditions', status: 'draft', seo_title: '', seo_description: '',
};

type Props = { initialData?: Partial<PostData>; mode: 'create' | 'edit' };

export default function BlogPostForm({ initialData = {}, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PostData>({ ...defaultData, ...initialData });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof PostData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === 'title' && mode === 'create') {
      setForm((prev) => ({ ...prev, title: value as string, slug: slugify(value as string) }));
    }
  };

  const handleSave = async (publishNow = false) => {
    setError(null);
    setSaving(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const status = publishNow ? 'published' : form.status;
      const payload = {
        title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
        cover_image_url: form.cover_image_url || null, category: form.category, status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        seo_title: form.seo_title || null, seo_description: form.seo_description || null,
      };
      if (mode === 'create') {
        const { error: err } = await supabase.from('blog_posts').insert(payload);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from('blog_posts').update(payload).eq('id', form.id!);
        if (err) throw err;
      }
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer cet article ?')) return;
    setDeleting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.from('blog_posts').delete().eq('id', form.id!);
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
      setDeleting(false);
    }
  };

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-or/30 focus:border-or transition-colors';

  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre *</label>
              <input type="text" value={form.title} onChange={(e) => set('title', e.target.value)} className={inputCls} placeholder="Titre de l'article" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug (URL)</label>
              <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputCls} />
              <p className="text-xs text-gray-400 mt-1">/blog/{form.slug || 'slug-de-larticle'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Extrait</label>
              <textarea rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} className={`${inputCls} resize-none`} placeholder="Résumé affiché dans la liste des articles" />
            </div>
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Contenu de l&apos;article</label>
            <textarea
              rows={20}
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
              placeholder="Écrivez le contenu de votre article ici. Vous pouvez utiliser du HTML basique pour le formatage."
            />
            <p className="text-xs text-gray-400 mt-2">Astuce HTML : &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;</p>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">SEO</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre SEO</label>
              <input type="text" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description SEO</label>
              <textarea rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} className={`${inputCls} resize-none`} />
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-4">
          {/* Publication */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">Publication</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="status" value="draft" checked={form.status === 'draft'} onChange={() => set('status', 'draft')} className="accent-bordeaux" />
                <span className="text-sm text-gray-700">Brouillon</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="status" value="published" checked={form.status === 'published'} onChange={() => set('status', 'published')} className="accent-bordeaux" />
                <span className="text-sm text-gray-700">Publié</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Image de couverture */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <ImageUpload
              bucket="blog-images"
              currentUrl={form.cover_image_url || undefined}
              onUpload={(url) => set('cover_image_url', url)}
              label="Image de couverture"
            />
          </div>

          {/* Actions */}
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl">{error}</div>}
          <button onClick={() => handleSave(false)} disabled={saving || !form.title} className="w-full bg-bordeaux text-white font-semibold text-sm py-3 rounded-full hover:bg-bordeaux-dark disabled:opacity-50 transition-colors">
            {saving ? 'Sauvegarde…' : form.status === 'published' ? 'Sauvegarder' : 'Enregistrer le brouillon'}
          </button>
          {form.status === 'draft' && (
            <button onClick={() => handleSave(true)} disabled={saving || !form.title} className="w-full border-2 border-bordeaux text-bordeaux font-semibold text-sm py-3 rounded-full hover:bg-bordeaux hover:text-white disabled:opacity-50 transition-colors">
              Publier l&apos;article
            </button>
          )}
          {mode === 'edit' && (
            <button onClick={handleDelete} disabled={deleting} className="w-full border border-red-200 text-red-600 text-sm py-2.5 rounded-full hover:bg-red-50 disabled:opacity-50 transition-colors">
              {deleting ? 'Suppression…' : 'Supprimer'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
