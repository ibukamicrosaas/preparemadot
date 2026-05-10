const problems = [
  {
    icon: '🤔',
    title: 'On ne sait pas quoi acheter',
    description: 'Il y a beaucoup d\'éléments à prévoir et les attentes varient selon les familles et les cultures.',
  },
  {
    icon: '🌍',
    title: 'Organiser à distance est compliqué',
    description: 'Trouver les bons produits, coordonner et tout gérer depuis l\'étranger n\'est pas évident.',
  },
  {
    icon: '📋',
    title: 'Risque d\'oublier des éléments',
    description: 'Une dot incomplète peut créer des malentendus et impacter le jour J de façon irrémédiable.',
  },
  {
    icon: '✨',
    title: 'La présentation compte beaucoup',
    description: 'Une dot mal présentée peut manquer d\'élégance et de respect aux yeux de la belle-famille.',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-ivoire">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-line" />
            <span className="text-or text-xs font-semibold tracking-[0.2em] uppercase">Pourquoi c&apos;est difficile ?</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bordeaux-dark font-semibold leading-tight">
            Préparer une dot, ce n&apos;est pas simple
          </h2>
          <p className="text-brun-light text-base md:text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Entre les traditions, les attentes familiales, les achats et l&apos;organisation, il est facile de se sentir dépassé.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`card-lift rounded-3xl p-7 border border-beige/80 ${i % 2 === 0 ? 'bg-beige' : 'bg-white'}`}
            >
              {/* Icon circle */}
              <div className="w-14 h-14 rounded-2xl bg-bordeaux-dark/8 flex items-center justify-center mb-5">
                <span className="text-3xl">{p.icon}</span>
              </div>
              <h3 className="font-serif text-bordeaux-dark font-semibold text-lg leading-snug mb-3">
                {p.title}
              </h3>
              <p className="text-brun-light text-sm leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
