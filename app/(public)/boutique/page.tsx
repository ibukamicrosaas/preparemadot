import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { getAllProducts } from '@/lib/db/products';
import { getCategoryBySlug } from '@/data/categories';

export const revalidate = 3600;
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/product/ProductFilters';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Boutique — Produits pour la dot africaine',
  description:
    'Découvrez notre sélection de produits pour la dot africaine : textiles traditionnels, bijoux, sacs, chaussures, accessoires et produits symboliques.',
  alternates: { canonical: '/boutique' },
};

type PageProps = {
  searchParams: Promise<{ categorie?: string }>;
};

export default async function BoutiquePage({ searchParams }: PageProps) {
  const { categorie } = await searchParams;
  const category = categorie ? getCategoryBySlug(categorie) : null;

  const allProducts = await getAllProducts();
  const filtered = categorie
    ? allProducts.filter((p) => p.category === categorie)
    : allProducts;

  return (
    <>
      {/* Hero */}
      <section className="bg-beige py-16 md:py-20 border-b border-beige/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <nav className="text-xs text-brun-light/50 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-bordeaux transition-colors">Accueil</Link>
              <span>›</span>
              <span className="text-brun-light">Boutique</span>
              {category && (
                <>
                  <span>›</span>
                  <span className="text-bordeaux">{category.name}</span>
                </>
              )}
            </nav>
            <h1 className="font-serif text-bordeaux-dark text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              {category ? category.name : 'Notre boutique'}
            </h1>
            <p className="text-brun-light text-base leading-relaxed">
              {category
                ? category.description
                : 'Tous les éléments essentiels pour une dot africaine complète et élégante.'}
            </p>
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="bg-ivoire py-6 border-b border-beige/40 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <Suspense fallback={null}>
            <ProductFilters />
          </Suspense>
        </div>
      </section>

      {/* Produits */}
      <section className="py-12 bg-ivoire">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-4xl block mb-4">🔍</span>
              <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">
                Aucun produit dans cette catégorie
              </h2>
              <p className="text-brun-light text-sm mb-6">
                Cette catégorie est en cours de constitution. Contactez-nous pour une demande spécifique.
              </p>
              <Link
                href="/boutique"
                className="text-sm font-medium text-bordeaux hover:underline"
              >
                Voir tous les produits →
              </Link>
            </div>
          ) : (
            <>
              <p className="text-brun-light text-sm mb-6">
                {filtered.length} produit{filtered.length > 1 ? 's' : ''}
                {category ? ` dans "${category.name}"` : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTASection
        title="Vous ne trouvez pas ce que vous cherchez ?"
        subtitle="Décrivez-nous votre besoin. Nous pouvons sourcer des produits spécifiques ou vous proposer une sélection personnalisée."
        ctaLabel="Faire une demande personnalisée"
        ctaHref="/demande-personnalisee"
        secondaryLabel="Écrire sur WhatsApp"
      />
    </>
  );
}
