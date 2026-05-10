const engagements = [
  {
    icon: '🏛️',
    title: 'Respect des traditions',
    description: 'Nous vous écoutons et adaptons votre dot aux coutumes et attentes familiales avec respect.',
  },
  {
    icon: '🤝',
    title: 'Accompagnement personnalisé',
    description: 'Vous suivez chaque étape avec un interlocuteur dédié, disponible et attentif à vos besoins.',
  },
  {
    icon: '📸',
    title: 'Validation photo avant livraison',
    description: 'Chaque élément est photographié et validé par vous avant la remise finale.',
  },
  {
    icon: '💬',
    title: 'Contact WhatsApp direct',
    description: 'Échangez rapidement et directement avec notre équipe. Réponse sous 24h garantie.',
  },
  {
    icon: '🌟',
    title: 'Produits choisis avec soin',
    description: 'Nous sélectionnons les meilleurs produits de qualité auprès de fournisseurs fiables.',
  },
  {
    icon: '❤️',
    title: 'Suivi humain et bienveillant',
    description: 'Nous restons disponibles même après la livraison pour répondre à vos questions.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-ivoire">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-line" />
            <span className="text-or text-xs font-semibold tracking-[0.2em] uppercase">Nos engagements</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bordeaux-dark font-semibold leading-tight">
            Une confiance qui se mérite, à chaque dot
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {engagements.map((eng) => (
            <div key={eng.title} className="card-lift flex gap-4 bg-beige rounded-2xl p-6 border border-beige/80">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-bordeaux-dark/8 flex items-center justify-center">
                <span className="text-xl">{eng.icon}</span>
              </div>
              <div>
                <h3 className="font-serif text-bordeaux-dark font-semibold text-base mb-1.5">{eng.title}</h3>
                <p className="text-brun-light text-sm leading-relaxed">{eng.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
