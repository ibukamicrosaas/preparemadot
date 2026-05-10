import Link from 'next/link';

const steps = [
  {
    number: '01',
    icon: '💬',
    title: 'Vous nous partagez votre besoin',
    description: 'Via WhatsApp ou notre formulaire, dites-nous votre culture, date, budget et niveau d\'accompagnement souhaité.',
  },
  {
    number: '02',
    icon: '🛍️',
    title: 'Nous vous proposons une sélection',
    description: 'Notre équipe compose une sélection personnalisée selon vos traditions et votre budget. Validation par échange.',
  },
  {
    number: '03',
    icon: '✅',
    title: 'Vous validez votre commande',
    description: 'Vous recevez des photos de chaque élément et validez. Aucune surprise — tout est confirmé avant.',
  },
  {
    number: '04',
    icon: '🎁',
    title: 'Nous préparons et livrons',
    description: 'Tout est emballé et présenté avec soin. Nous organisons la remise ou la livraison, selon vous.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-line" />
            <span className="text-or text-xs font-semibold tracking-[0.2em] uppercase">Notre processus</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bordeaux-dark font-semibold leading-tight">
            Comment ça marche ?
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Ligne connectrice desktop */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-transparent via-or/30 to-transparent" />

          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              {/* Numéro + icône */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-bordeaux-dark flex items-center justify-center shadow-lg shadow-bordeaux/20 relative z-10">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-or flex items-center justify-center">
                  <span className="font-serif font-bold text-bordeaux-dark text-xs">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>

              <h3 className="font-serif text-bordeaux-dark font-semibold text-lg leading-snug mb-3">
                {step.title}
              </h3>
              <p className="text-brun-light text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/demande-personnalisee"
            className="inline-flex items-center gap-2 bg-bordeaux text-ivoire font-semibold text-sm px-8 py-4 rounded-full hover:bg-bordeaux-dark transition-all duration-200 hover:scale-[1.02] shadow-md"
          >
            Commencer ma demande personnalisée
          </Link>
        </div>
      </div>
    </section>
  );
}
