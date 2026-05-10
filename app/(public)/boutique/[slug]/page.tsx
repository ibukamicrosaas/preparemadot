import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts, getProductBySlug } from '@/lib/db/products';
import { products as staticProducts } from '@/data/products';
import { getCategoryById } from '@/data/categories';

export const revalidate = 3600;
import { formatPrice } from '@/lib/utils';
import { getProductWhatsAppUrl } from '@/lib/whatsapp';
import CTASection from '@/components/sections/CTASection';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getAllProducts().catch(() => staticProducts);
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.shortDescription,
    alternates: { canonical: `/boutique/${product.slug}` },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategoryById(product.category);
  const priceDisplay = formatPrice(product.price, product.priceLabel, product.isPriceOnRequest);
  const whatsappUrl = getProductWhatsAppUrl(product.name);

  return (
    <>
      <section className="py-12 md:py-20 bg-ivoire">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-brun-light/50 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-bordeaux transition-colors">Accueil</Link>
            <span>›</span>
            <Link href="/boutique" className="hover:text-bordeaux transition-colors">Boutique</Link>
            {category && (
              <>
                <span>›</span>
                <Link href={`/boutique?categorie=${category.slug}`} className="hover:text-bordeaux transition-colors">
                  {category.name}
                </Link>
              </>
            )}
            <span>›</span>
            <span className="text-bordeaux">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="bg-beige rounded-3xl aspect-square flex items-center justify-center">
              <div className="text-center">
                <span className="text-7xl block mb-4">{category?.icon || '📦'}</span>
                <span className="text-sm text-brun-light/60">{category?.name}</span>
              </div>
            </div>

            {/* Détails */}
            <div>
              {category && (
                <Link
                  href={`/boutique?categorie=${category.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brun-light/60 hover:text-bordeaux mb-3 transition-colors"
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              )}

              <h1 className="font-serif text-bordeaux-dark text-3xl md:text-4xl font-semibold leading-tight mb-4">
                {product.name}
              </h1>

              <p className="text-brun-light text-base leading-relaxed mb-6">
                {product.description || product.shortDescription}
              </p>

              {/* Disponibilité */}
              <div className="flex items-center gap-3 mb-6">
                {product.availability === 'available' && (
                  <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium">
                    ✓ Disponible
                  </span>
                )}
                {product.availability === 'on_request' && (
                  <span className="text-xs bg-or/10 text-or border border-or/20 px-3 py-1 rounded-full font-medium">
                    Sur commande
                  </span>
                )}
                {product.availability === 'unavailable' && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">
                    Temporairement indisponible
                  </span>
                )}
              </div>

              {/* Prix */}
              <div className="mb-8">
                <p className="text-2xl font-bold text-bordeaux">{priceDisplay}</p>
                {product.isPriceOnRequest && (
                  <p className="text-xs text-brun-light/60 mt-1">
                    Le prix définitif est établi selon vos besoins spécifiques et les options choisies.
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-[#1DAA57] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.1 1.516 5.83L.063 23.25l5.594-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.884 0-3.636-.515-5.124-1.406l-.367-.218-3.319.871.885-3.235-.239-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Demander via WhatsApp
                </a>
                <Link
                  href="/demande-personnalisee"
                  className="flex items-center justify-center border-2 border-bordeaux text-bordeaux font-semibold text-sm px-7 py-4 rounded-full hover:bg-bordeaux hover:text-ivoire transition-colors"
                >
                  Faire une demande personnalisée
                </Link>
              </div>

              <p className="text-xs text-brun-light/50 mt-4">
                Ce produit peut être intégré dans un pack d&apos;accompagnement complet. Contactez-nous pour plus d&apos;informations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Intéressé(e) par un accompagnement complet ?"
        subtitle="Nous pouvons intégrer ce produit dans un pack personnalisé et gérer toute la préparation de votre dot."
        ctaLabel="Voir nos packs"
        ctaHref="/packs"
        secondaryLabel="Écrire sur WhatsApp"
        dark={false}
      />
    </>
  );
}
