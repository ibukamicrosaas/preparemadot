import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPacks } from '@/lib/db/packs';
import { getPackWhatsAppUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';
import CTASection from '@/components/sections/CTASection';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Nos packs d\'accompagnement',
  description:
    'Découvrez nos packs d\'accompagnement pour la préparation de la dot africaine : Pack Essentiel, Pack Tradition et Pack Premium À Distance.',
  alternates: { canonical: '/packs' },
};

export default async function PacksPage() {
  const packs = await getAllPacks();
  return (
    <>
      {/* Hero */}
      <section className="bg-bordeaux-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-or/20 border border-or/30 text-or text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Nos offres
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivoire font-semibold leading-tight mb-5">
            Des packs pensés pour chaque situation
          </h1>
          <p className="text-beige/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Que vous prépariez votre dot seul(e), en famille ou à distance, nous avons un accompagnement adapté à votre réalité.
          </p>
        </div>
      </section>

      {/* Packs détaillés */}
      <section className="py-20 md:py-28 bg-ivoire">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {packs.map((pack, index) => (
            <div
              key={pack.id}
              className={cn(
                'rounded-3xl overflow-hidden border-2',
                pack.featured
                  ? 'border-or/40 shadow-xl shadow-or/10'
                  : 'border-beige/60'
              )}
            >
              {pack.highlight && (
                <div className="bg-or text-bordeaux-dark text-center text-xs font-bold tracking-widest uppercase py-2.5">
                  {pack.highlight}
                </div>
              )}

              <div className="bg-ivoire p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  {/* Infos */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-or tracking-widest uppercase">
                        Pack {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="font-serif text-bordeaux-dark text-3xl md:text-4xl font-semibold mb-4 leading-tight">
                      {pack.name}
                    </h2>
                    <p className="text-brun-light text-base leading-relaxed mb-8">
                      {pack.description}
                    </p>

                    {/* Inclusions */}
                    <h3 className="font-semibold text-brun text-sm uppercase tracking-wide mb-4">
                      Ce qui est inclus
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pack.inclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-brun-light">
                          <span className="text-or mt-0.5 flex-shrink-0 font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className={cn(
                    'rounded-2xl p-6 flex flex-col items-center text-center',
                    pack.featured ? 'bg-bordeaux-dark' : 'bg-beige'
                  )}>
                    <p className={cn(
                      'text-xs font-semibold tracking-widest uppercase mb-1',
                      pack.featured ? 'text-or/60' : 'text-brun-light/60'
                    )}>
                      Tarif
                    </p>
                    <p className={cn(
                      'font-serif text-2xl font-bold mb-6',
                      pack.featured ? 'text-or' : 'text-bordeaux-dark'
                    )}>
                      {pack.priceLabel}
                    </p>

                    <a
                      href={getPackWhatsAppUrl(pack.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'w-full text-center font-semibold text-sm py-3.5 px-6 rounded-full transition-colors mb-3',
                        pack.featured
                          ? 'bg-or text-bordeaux-dark hover:bg-or-light'
                          : 'bg-bordeaux text-ivoire hover:bg-bordeaux-dark'
                      )}
                    >
                      {pack.ctaLabel}
                    </a>

                    <Link
                      href="/demande-personnalisee"
                      className={cn(
                        'text-xs font-medium hover:underline transition-colors',
                        pack.featured ? 'text-beige/50 hover:text-beige' : 'text-brun-light/60 hover:text-bordeaux'
                      )}
                    >
                      Remplir le formulaire
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ packs */}
      <section className="py-16 bg-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-bordeaux-dark text-2xl md:text-3xl font-semibold text-center mb-10">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Comment se déroule le premier contact ?',
                a: 'Vous remplissez notre formulaire ou vous nous écrivez sur WhatsApp. Un membre de notre équipe vous répond dans les 24h pour mieux comprendre votre situation.',
              },
              {
                q: 'Les prix sont-ils vraiment sur devis ?',
                a: 'Oui. Chaque dot est unique : la taille, les produits, les traditions et la logistique varient. Nous construisons une proposition sur mesure selon votre besoin réel.',
              },
              {
                q: 'Peut-on combiner un pack avec des produits de la boutique ?',
                a: 'Absolument. Les packs incluent déjà des produits, mais vous pouvez ajouter des éléments spécifiques selon vos traditions ou les attentes de la famille.',
              },
              {
                q: 'Travaillez-vous avec toutes les cultures africaines ?',
                a: 'Oui, avec un focus sur l\'Afrique centrale (Congo, Cameroun, Gabon, etc.). Nous adaptons notre accompagnement à vos traditions spécifiques.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-ivoire rounded-2xl p-6">
                <h3 className="font-serif text-bordeaux-dark font-semibold text-base mb-2">{faq.q}</h3>
                <p className="text-brun-light text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Vous hésitez encore ?"
        subtitle="Écrivez-nous. On discute de votre situation sans engagement et on vous dit honnêtement quel pack est fait pour vous."
        ctaLabel="Faire une demande personnalisée"
        ctaHref="/demande-personnalisee"
        secondaryLabel="Écrire sur WhatsApp"
      />
    </>
  );
}
