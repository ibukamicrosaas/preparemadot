'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ImageUpload from './ImageUpload';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { deleteImage } from '@/lib/supabase/upload';

type Category = { slug: string; name: string };

type ProductData = {
  id?: string;
  name: string;
  slug: string;
  category_slug: string;
  short_description: string;
  description: string;
  price: string;
  price_label: string;
  is_price_on_request: boolean;
  availability: string;
  images: string[];
  featured: boolean;
  published: boolean;
  seo_title: string;
  seo_description: string;
};

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

type Props = {
  categories: Category[];
  initialData?: Partial<ProductData>;
  mode: 'create' | 'edit';
};

const defaultData: ProductData = {
  name: '', slug: '', category_slug: '', short_description: '', description: '',
  price: '', price_label: 'Sur devis', is_price_on_request: true,
  availability: 'available', images: [], featured: false, published: true,
  seo_title: '', seo_description: '',
};

export default function ProductForm({ categories, initialData = {}, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<ProductData>({ ...defaultData, ...initialData });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof ProductData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === 'name' && mode === 'create') {
      setForm((prev) => ({ ...prev, name: value as string, slug: slugify(value as string) }));
    }
  };

  const addImage = (url: string) => {
    setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
  };

  const removeImage = async (url: string, idx: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
    try { await deleteImage('product-images', url); } catch { /* ignorer */ }
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const payload = {
        name: form.name,
        slug: form.slug,
        category_slug: form.category_slug || null,
        short_description: form.short_description,
        description: form.description || null,
        price: form.price ? parseFloat(form.price) : null,
        price_label: form.price_label || null,
        is_price_on_request: form.is_price_on_request,
        availability: form.availability,
        images: form.images,
        featured: form.featured,
        published: form.published,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
      };

      if (mode === 'create') {
        const { error: err } = await supabase.from('products').insert(payload);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from('products').update(payload).eq('id', form.id!);
        if (err) throw err;
      }
      router.push('/admin/produits');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer ce produit définitivement ?')) return;
    setDeleting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.from('products').delete().eq('id', form.id!);
      router.push('/admin/produits');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      setDeleting(false);
    }
  };

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-or/30 focus:border-or transition-colors';
  const labelCls = 'block text-sm font-medium text-gray-700 mb-1.5';

  return (
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations de base */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">Informations</h2>
            <div>
              <label className={labelCls}>Nom du produit *</label>
              <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} placeholder="Ex: Pagne wax premium 6 yards" />
            </div>
            <div>
              <label className={labelCls}>Slug (URL)</label>
              <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputCls} />
              <p className="text-xs text-gray-400 mt-1">/boutique/{form.slug || 'slug-du-produit'}</p>
            </div>
            <div>
              <label className={labelCls}>Catégorie</label>
              <select value={form.category_slug} onChange={(e) => set('category_slug', e.target.value)} className={inputCls}>
                <option value="">Sélectionner une catégorie</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Description courte</label>
              <textarea rows={2} value={form.short_description} onChange={(e) => set('short_description', e.target.value)} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Description complète</label>
              <textarea rows={5} value={form.description} onChange={(e) => set('description', e.target.value)} className={`${inputCls} resize-none`} />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">Images</h2>
            <div className="grid grid-cols-3 gap-3">
              {form.images.map((url, idx) => (
                <div key={url} className="relative group">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
                    <Image src={url} alt="" fill className="object-cover" unoptimized />
                  </div>
                  <button
                    onClick={() => removeImage(url, idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              {form.images.length < 5 && (
                <ImageUpload bucket="product-images" onUpload={addImage} label="" />
              )}
            </div>
            <p className="text-xs text-gray-400">Maximum 5 images. La première est l&apos;image principale.</p>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-sm">SEO</h2>
            <div>
              <label className={labelCls}>Titre SEO</label>
              <input type="text" value={form.seo_title} onChange={(e) => set('seo_title', e.target.value)} className={inputCls} placeholder={form.name || 'Titre pour les moteurs de recherche'} />
            </div>
            <div>
              <label className={labelCls}>Description SEO</label>
              <textarea rows={2} value={form.seo_description} onChange={(e) => set('seo_description', e.target.value)} className={`${inputCls} resize-none`} />
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-4">
          {/* Publication */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <h2 className="font-semibold text-gray-900 text-sm">Publication</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-bordeaux" />
              <span className="text-sm text-gray-700">Publié (visible sur le site)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-or" />
              <span className="text-sm text-gray-700">En vedette (page d&apos;accueil)</span>
            </label>
          </div>

          {/* Prix */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <h2 className="font-semibold text-gray-900 text-sm">Prix</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_price_on_request} onChange={(e) => set('is_price_on_request', e.target.checked)} className="w-4 h-4 accent-bordeaux" />
              <span className="text-sm text-gray-700">Prix sur devis</span>
            </label>
            {!form.is_price_on_request && (
              <div>
                <label className={labelCls}>Prix (€)</label>
                <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} className={inputCls} />
              </div>
            )}
            <div>
              <label className={labelCls}>Libellé prix</label>
              <input type="text" value={form.price_label} onChange={(e) => set('price_label', e.target.value)} className={inputCls} placeholder="Ex: À partir de 45 €" />
            </div>
          </div>

          {/* Disponibilité */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2">
            <h2 className="font-semibold text-gray-900 text-sm mb-3">Disponibilité</h2>
            {[
              { value: 'available', label: 'Disponible' },
              { value: 'on_request', label: 'Sur commande' },
              { value: 'unavailable', label: 'Indisponible' },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="availability" value={opt.value} checked={form.availability === opt.value} onChange={() => set('availability', opt.value)} className="accent-bordeaux" />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Actions */}
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl">{error}</div>}
          <button onClick={handleSave} disabled={saving || !form.name} className="w-full bg-bordeaux text-white font-semibold text-sm py-3 rounded-full hover:bg-bordeaux-dark disabled:opacity-50 transition-colors">
            {saving ? 'Sauvegarde…' : mode === 'create' ? 'Créer le produit' : 'Sauvegarder'}
          </button>
          {mode === 'edit' && (
            <button onClick={handleDelete} disabled={deleting} className="w-full border border-red-200 text-red-600 text-sm py-2.5 rounded-full hover:bg-red-50 disabled:opacity-50 transition-colors">
              {deleting ? 'Suppression…' : 'Supprimer le produit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
