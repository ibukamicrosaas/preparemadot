const testimonials = [
  {
    name: 'Amara K.',
    location: 'Bruxelles, Belgique',
    avatar: 'AK',
    color: 'from-[#8B5E2B] to-[#6B4020]',
    stars: 5,
    text: 'Merci à Prepare Ma Dot pour votre professionnalisme exceptionnel. Ma famille était ravie ! Tout était parfaitement organisé depuis la Belgique, comme si j\'étais sur place.',
  },
  {
    name: 'Yannick & Mirella',
    location: 'Paris, France',
    avatar: 'YM',
    color: 'from-[#6E1F2F] to-[#3A111A]',
    stars: 5,
    text: 'À distance, c\'était pour nous la meilleure option. L\'accompagnement complet en photo et vidéo nous a permis de valider chaque élément avec sérénité.',
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-or text-sm">★</span>
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-line" />
            <span className="text-or text-xs font-semibold tracking-[0.2em] uppercase">Témoignages</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-bordeaux-dark font-semibold">
            Elles nous ont fait confiance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="card-lift bg-ivoire rounded-3xl p-7 border border-beige/80">
              {/* Stars */}
              <Stars count={t.stars} />

              {/* Texte */}
              <p className="text-brun-light text-sm leading-relaxed mt-4 mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-ivoire text-xs font-bold">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-bordeaux-dark text-sm">{t.name}</p>
                  <p className="text-brun-light text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-brun-light/50 text-xs mt-8">
          * Témoignages de clients accompagnés — contenu à remplacer par vos vrais avis
        </p>
      </div>
    </section>
  );
}
