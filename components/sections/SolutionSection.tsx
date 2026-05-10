import Link from 'next/link';

const benefits = [
  'Sélection des meilleurs éléments selon vos traditions et votre budget',
  'Accompagnement personnalisé à chaque étape',
  'Préparation soignée et élégante de chaque détail',
  'Solution idéale pour les familles et couples de la diaspora',
];

export default function SolutionSection() {
  return (
    <section className="py-20 md:py-28 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Visuel gauche */}
          <div className="relative">
            {/* Cadre principal */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-bordeaux-dark via-bordeaux to-[#8B3A4A] aspect-[4/5] max-w-md mx-auto lg:mx-0 border border-or/20">
              <div className="absolute inset-0 pattern-dot opacity-30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                <span className="text-7xl mb-6">🌸</span>
                <h3 className="font-serif text-ivoire text-2xl font-semibold mb-3 leading-tight">
                  Dot préparée avec soin
                </h3>
                <p className="text-beige/60 text-sm leading-relaxed">
                  De la première consultation à la remise finale, nous gérons tout.
                </p>
                {/* Éléments flottants */}
                <div className="grid grid-cols-3 gap-3 mt-8 w-full">
                  {['🧵 Textiles', '💍 Bijoux', '🧺 Paniers'].map((item) => (
                    <div key={item} className="bg-white/10 rounded-xl py-2 px-1 text-center border border-white/10">
                      <span className="text-beige/80 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Décoration coin */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-or/15 -z-10" />
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-bordeaux/20 -z-10" />

            {/* Badge */}
            <div className="absolute top-6 -right-4 bg-ivoire border border-beige rounded-2xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <div>
                  <p className="text-xs font-semibold text-bordeaux-dark">5/5 satisfaction</p>
                  <p className="text-brun-light text-[10px]">clients accompagnés</p>
                </div>
              </div>
            </div>
          </div>

          {/* Texte droit */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="gold-line" />
              <span className="text-or text-xs font-semibold tracking-[0.2em] uppercase">La solution →</span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bordeaux-dark font-semibold leading-tight mb-5">
              Prepare Ma Dot vous accompagne de A à Z
            </h2>

            <p className="text-brun-light text-base leading-relaxed mb-8">
              Nous vous aidons à préparer une dot complète, élégante et adaptée à vos traditions, que vous soyez sur place ou à distance.
            </p>

            {/* Bénéfices */}
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-or/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-or text-xs font-bold">✓</span>
                  </div>
                  <span className="text-brun-light text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/demande-personnalisee"
              className="inline-flex items-center justify-center bg-bordeaux text-ivoire font-semibold text-sm px-8 py-4 rounded-full hover:bg-bordeaux-dark transition-all duration-200 hover:scale-[1.02] shadow-md"
            >
              Faire une demande personnalisée
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
