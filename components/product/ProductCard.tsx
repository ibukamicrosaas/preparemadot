import Link from 'next/link';
import type { Product } from '@/data/types';
import { formatPrice } from '@/lib/utils';
import { getProductWhatsAppUrl } from '@/lib/whatsapp';
import { getCategoryById } from '@/data/categories';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const category = getCategoryById(product.category);
  const priceDisplay = formatPrice(product.price, product.priceLabel, product.isPriceOnRequest);

  return (
    <div className="group bg-ivoire rounded-2xl overflow-hidden border border-beige hover:border-or/40 hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Image */}
      <Link href={`/boutique/${product.slug}`}>
        <div className="aspect-square bg-beige flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <span className="text-4xl block mb-2">{category?.icon || '📦'}</span>
            <span className="text-xs text-brun-light/60">{category?.name}</span>
          </div>
        </div>
      </Link>

      {/* Contenu */}
      <div className="p-5 flex flex-col flex-1">
        {/* Badge disponibilité */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-brun-light/60 uppercase tracking-wide">{category?.name}</span>
          {product.availability === 'available' && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">Disponible</span>
          )}
          {product.availability === 'on_request' && (
            <span className="text-xs bg-or/10 text-or-dark px-2 py-0.5 rounded-full font-medium">Sur commande</span>
          )}
        </div>

        <Link href={`/boutique/${product.slug}`}>
          <h3 className="font-serif text-bordeaux-dark font-semibold text-base leading-snug mb-2 group-hover:text-bordeaux transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-brun-light text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-beige">
          <span className="font-semibold text-bordeaux text-sm">{priceDisplay}</span>
          <a
            href={getProductWhatsAppUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.1 1.516 5.83L.063 23.25l5.594-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.884 0-3.636-.515-5.124-1.406l-.367-.218-3.319.871.885-3.235-.239-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
