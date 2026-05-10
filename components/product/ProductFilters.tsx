'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils';

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('categorie') || '';

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('categorie', slug);
    } else {
      params.delete('categorie');
    }
    router.push(`/boutique?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setCategory('')}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          !current
            ? 'bg-bordeaux text-ivoire'
            : 'bg-beige text-brun-light hover:bg-beige/80'
        )}
      >
        Tous les produits
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.slug)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            current === cat.slug
              ? 'bg-bordeaux text-ivoire'
              : 'bg-beige text-brun-light hover:bg-beige/80'
          )}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
