'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

type PackData = {
  id?: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  inclusions: string[];
  price_label: string;
  price: string;
  featured: boolean;
  highlight: string;
  cta_label: string;
  image_url: string;
  order: number;
  published: boolean;
};

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const defaultData: PackData = {
  name: '', slug: '', short_description: '', description: '', inclusions: [''],
  price_label: 'Sur devis', price: '', featured: false, highlight: '',
  cta_label: 'Demander ce pack', image_url: '', order: 0, published: true,
};

type Props = { initialData?: Partial<PackData>; mode: 'create' | 'edit' };

export default function PackForm({ initialData = {}, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PackData>({ ...defaultData, ...initialData });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof PackData, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === 'name' && mode === 'create') {
      setForm((prev) => ({ ...prev, name: value as string, slug: slugify(value as string) }));
    }
  };

  const setInclusion = (idx: number, value: string) => {
    const next = [...form.inclusions];
    next[idx] = value;
    setForm((prev) => ({ ...prev, inclusions: next }));
  };

  const addInclusion = () => setForm((prev) => ({ ...prev, inclusions: [...prev.inclusions, ''] }));

  const removeInclusion = (idx: number) =>
    setForm((prev) => ({ ...prev, inclusions: prev.inclusions.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const payload = {
        name: form.name, slug: form.slug,
        short_description: form.short_description, description: form.description,
        inclusions: form.inclusions.filter(Boolean),
        price_label: form.price_label, price: form.price ? parseFloat(form.price) : null,
        featured: form.featured, highlight: form.highlight || null,
        cta_label: form.cta_label, image_url: form.image_url || null,
        order: form.order, published: form.published,
      };
      if (mode === 'create') {
        const { error: err } = await supabase.from('packs').insert(payload);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from('packs').update(payload).eq('id', form.id!);
        if (err) throw err;
      }
      router.push('/admin/packs');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer ce pack ?')) return;
    setDeleting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      await supabase.from('packs').delete().eq('id', form.id!);
      router.push('/admin/packs');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
      setDeleting(false);
    }
  };

  const inputCls = 'w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-or/30 focus:border-or transition-colors';

  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-semibold text-gray-900 text-sm">Informations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
            <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
            <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputCls} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description courte</label>
          <textarea rows={2} value={form.short_description} onChange={(e) => set('short_description', e.target.value)} className={`${inputCls} resize-none`} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description complète</label>
          <textarea rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} className={`${inputCls} resize-none`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Label prix</label>
            <input type="text" value={form.price_label} onChange={(e) => set('price_label', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Prix (€, optionnel)</label>
            <input type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Label CTA</label>
            <input type="text" value={form.cta_label} onChange={(e) => set('cta_label', e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Badge highlight</label>
            <input type="text" value={form.highlight} onChange={(e) => set('highlight', e.target.value)} className={inputCls} placeholder="Ex: Le plus populaire" />
          </div>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="accent-bordeaux" />
            Publié
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="accent-or" />
            En vedette
          </label>
        </div>
      </div>

      {/* Inclusions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
        <h2 className="font-semibold text-gray-900 text-sm">Ce qui est inclus</h2>
        {form.inclusions.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input type="text" value={item} onChange={(e) => setInclusion(idx, e.target.value)} placeholder={`Inclusion ${idx + 1}`} className={`${inputCls} flex-1`} />
            {form.inclusions.length > 1 && (
              <button onClick={() => removeInclusion(idx)} className="text-red-400 hover:text-red-600 text-lg px-2">×</button>
            )}
          </div>
        ))}
        <button onClick={addInclusion} className="text-sm text-bordeaux font-medium hover:underline">+ Ajouter une inclusion</button>
      </div>

      {/* Image */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <ImageUpload bucket="product-images" currentUrl={form.image_url || undefined} onUpload={(url) => set('image_url', url)} label="Image du pack" />
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

      <div className="flex gap-3">
        <button onClick={handleSave} disabled={saving || !form.name} className="bg-bordeaux text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-bordeaux-dark disabled:opacity-50 transition-colors">
          {saving ? 'Sauvegarde…' : mode === 'create' ? 'Créer le pack' : 'Sauvegarder'}
        </button>
        {mode === 'edit' && (
          <button onClick={handleDelete} disabled={deleting} className="border border-red-200 text-red-600 text-sm px-6 py-3 rounded-full hover:bg-red-50 disabled:opacity-50 transition-colors">
            {deleting ? 'Suppression…' : 'Supprimer'}
          </button>
        )}
      </div>
    </div>
  );
}
