import Link from 'next/link';
import { getPackWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

const packs = [
  {
    name: 'Pack Essentiel',
    slug: 'pack-essentiel',
    badge: null,
    featured: false,
    price: 'À partir de 450 000 FCFA',
    inclusions: [
      'Sélection des éléments essentiels',
      'Conseils personnalisés',
      'Paniers et présentation soignée',
      'Livraison incluse',
    ],
    cta: 'Choisir ce pack',
  },
  {
    name: 'Pack Premium à distance',
    slug: 'pack-premium-a-distance',
    badge: 'LE PLUS CHOISI',
    featured: true,
    price: 'À partir de 900 000 FCFA',
    inclusions: [
      'Sélection complète et haut de gamme',
      'Préparation premium et personnalisée',
      'Validation photo avant livraison',
      'Livraison sécurisée à l\'étranger',
      'Accompagnement dédié',
    ],
    cta: 'Choisir ce pack',
  },
  {
    name: 'Pack Tradition',
    slug: 'pack-tradition',
    badge: null,
    featured: false,
    price: 'À partir de 650 000 FCFA',
    inclusions: [
      'Éléments traditionnels complets',
      'Présentation traditionnelle',
      'Conseils et suivi',
      'Livraison incluse',
    ],
    cta: 'Choisir ce pack',
  },
];

export default function PacksPreview() {
  return (
    <section className="py-20 md:py-28 bg-bordeaux-dark relative overflow-hidden">
      <div className="absolute inset-0 pattern-dot opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-line" />
            <span className="text-or/80 text-xs font-semibold tracking-[0.2em] uppercase">Nos offres</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivoire font-semibold leading-tight">
            Des packs pensés pour chaque situation
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {packs.map((pack) => (
            <div
              key={pack.slug}
              className={cn(
                'rounded-3xl overflow-hidden flex flex-col relative',
                pack.featured
                  ? 'bg-or ring-2 ring-or ring-offset-2 ring-offset-bordeaux-dark shadow-2xl shadow-or/20 scale-[1.03]'
                  : 'bg-bordeaux/40 border border-beige/10'
              )}
            >
              {/* Badge */}
              {pack.badge && (
                <div className="bg-bordeaux-dark text-or text-center text-xs font-bold tracking-widest uppercase py-2.5">
                  {pack.badge}
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Nom */}
                <h3 className={cn('font-serif text-2xl font-semibold mb-1', pack.featured ? 'text-bordeaux-dark' : 'text-ivoire')}>
                  {pack.name}
                </h3>

                {/* Prix */}
                <p className={cn('text-sm font-semibold mb-6', pack.featured ? 'text-bordeaux/80' : 'text-or/80')}>
                  {pack.price}
                </p>

                {/* Inclusions */}
                <ul className="space-y-3 mb-8 flex-1">
                  {pack.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <div className={cn('mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold', pack.featured ? 'bg-bordeaux/20 text-bordeaux' : 'bg-or/20 text-or')}>
                        ✓
                      </div>
                      <span className={pack.featured ? 'text-bordeaux-dark' : 'text-beige/80'}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={getPackWhatsAppUrl(pack.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-full text-center font-semibold text-sm py-3.5 px-6 rounded-full transition-all duration-200 hover:scale-[1.02]',
                    pack.featured
                      ? 'bg-bordeaux-dark text-or hover:bg-bordeaux'
                      : 'bg-or/15 border border-or/30 text-or hover:bg-or/25'
                  )}
                >
                  {pack.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Réassurance */}
        <p className="text-center text-beige/40 text-xs mt-8 tracking-wide">
          Paiement sécurisé • Livraison fiable • Satisfaction garantie
        </p>

        {/* Lien détail */}
        <div className="text-center mt-4">
          <Link href="/packs" className="text-beige/50 hover:text-or text-sm font-medium transition-colors">
            Comparer tous les packs en détail →
          </Link>
        </div>
      </div>
    </section>
  );
}
