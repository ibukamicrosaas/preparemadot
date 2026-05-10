import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHeader from '@/components/shared/SectionHeader';
import CTASection from '@/components/sections/CTASection';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Comment ça marche',
  description:
    'Découvrez comment Prepare Ma Dot vous accompagne étape par étape dans la préparation de votre dot africaine — de la première consultation à la remise finale.',
  alternates: { canonical: '/comment-ca-marche' },
};

const steps = [
  {
    number: '01',
    title: 'Vous partagez votre besoin',
    description:
      'Remplissez notre formulaire de demande personnalisée ou écrivez-nous directement sur WhatsApp. Nous vous posons quelques questions essentielles pour bien comprendre votre situation.',
    details: [
      'Culture ou pays concerné par la dot',
      'Date prévue de la cérémonie',
      'Ville ou pays d\'organisation',
      'Budget approximatif',
      'Liste déjà disponible ou non',
    ],
    icon: '💬',
  },
  {
    number: '02',
    title: 'Nous vous conseillons et composons',
    description:
      'Sur la base de vos informations, notre équipe vous aide à identifier les éléments nécessaires selon vos traditions familiales et culturelles. Nous vous proposons les produits les plus adaptés.',
    details: [
      'Aide à la composition de la liste selon vos traditions',
      'Suggestion de produits et alternatives selon le budget',
      'Prise en compte des attentes familiales',
      'Accompagnement personnalisé via WhatsApp',
    ],
    icon: '✨',
  },
  {
    number: '03',
    title: 'Vous validez l\'offre',
    description:
      'Nous vous envoyons une proposition claire avec les éléments sélectionnés. Vous prenez le temps de revoir, d\'ajuster et de confirmer. Aucune précipitation.',
    details: [
      'Proposition détaillée par écrit',
      'Possibilité d\'ajuster les éléments',
      'Validation du budget final',
      'Confirmation des délais',
    ],
    icon: '✅',
  },
  {
    number: '04',
    title: 'Nous préparons et organisons',
    description:
      'Une fois votre accord obtenu, nous passons à la préparation. Chaque élément est sélectionné avec soin, présenté élégamment, et la remise est organisée selon votre situation.',
    details: [
      'Achat et sélection des produits',
      'Présentation soignée dans des paniers ou valises',
      'Photos et vidéos de validation avant remise',
      'Remise en main propre ou coordination de livraison',
    ],
    icon: '🎁',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bordeaux-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-or/20 border border-or/30 text-or text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Le processus
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivoire font-semibold mb-6 leading-tight">
            Comment ça marche ?
          </h1>
          <p className="text-beige/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Prepare Ma Dot accompagne les familles dans la préparation de leur dot en tenant compte des traditions, du budget, de la distance et du niveau d&apos;accompagnement souhaité.
          </p>
          <Link
            href="/demande-personnalisee"
            className="inline-flex items-center justify-center bg-or text-bordeaux-dark font-semibold text-base px-8 py-4 rounded-full hover:bg-or-light transition-colors"
          >
            Démarrer ma demande
          </Link>
        </div>
      </section>

      {/* Étapes */}
      <section className="py-20 md:py-28 bg-ivoire">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Texte */}
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-serif text-or text-4xl font-bold">{step.number}</span>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <h2 className="font-serif text-bordeaux-dark text-2xl md:text-3xl font-semibold mb-4 leading-tight">
                    {step.title}
                  </h2>
                  <p className="text-brun-light text-base leading-relaxed mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-brun-light">
                        <span className="text-or mt-1 flex-shrink-0">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visuel */}
                <div className={`bg-beige rounded-3xl h-64 flex items-center justify-center ${index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <div className="text-center">
                    <span className="text-6xl block mb-3">{step.icon}</span>
                    <span className="font-serif text-bordeaux-dark/40 text-lg">Étape {step.number}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section diaspora */}
      <section className="py-16 bg-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-bordeaux-dark rounded-3xl p-10 md:p-14 text-center">
            <span className="text-3xl block mb-4">🌍</span>
            <h2 className="font-serif text-ivoire text-2xl md:text-3xl font-semibold mb-4">
              Vous vivez à l&apos;étranger ?
            </h2>
            <p className="text-beige/70 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Pas de problème. Tout notre processus est pensé pour fonctionner à distance. Nous échangeons via WhatsApp, vous recevez des photos et vidéos à chaque étape, et nous organisons la remise avec vos proches sur place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packs"
                className="inline-flex items-center justify-center bg-or text-bordeaux-dark font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-or-light transition-colors"
              >
                Découvrir le Pack À Distance
              </Link>
              <a
                href={getWhatsAppUrl('default')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-or/40 text-or font-medium text-sm px-7 py-3.5 rounded-full hover:bg-or/10 transition-colors"
              >
                Nous écrire sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Prêt(e) à commencer ?"
        subtitle="Remplissez notre formulaire en quelques minutes et notre équipe vous contacte rapidement pour définir ensemble votre dot."
        ctaLabel="Faire une demande personnalisée"
        ctaHref="/demande-personnalisee"
        secondaryLabel="Écrire sur WhatsApp"
      />
    </>
  );
}
