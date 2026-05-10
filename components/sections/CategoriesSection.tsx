import Link from 'next/link';

const categories = [
  { slug: 'textiles-traditionnels', name: 'Textiles traditionnels', icon: '🧵', gradient: 'from-[#8B5E2B] to-[#6B4020]', light: 'from-[#F5E6D0] to-[#EDD9B8]' },
  { slug: 'bijoux-parures', name: 'Bijoux & parures', icon: '💍', gradient: 'from-[#C8A24A] to-[#A07830]', light: 'from-[#FDF6E3] to-[#F5EBCC]' },
  { slug: 'produits-symboliques', name: 'Produits symboliques', icon: '🌿', gradient: 'from-[#4A7A3B] to-[#2D5A26]', light: 'from-[#E8F5E3] to-[#D4EBC8]' },
  { slug: 'boissons-cadeaux', name: 'Boissons & cadeaux', icon: '🍾', gradient: 'from-[#6B3A2A] to-[#4A2010]', light: 'from-[#F5E8E3] to-[#EBD8D0]' },
  { slug: 'paniers-valises-presentation', name: 'Paniers & valises', icon: '🧺', gradient: 'from-[#5C3D2E] to-[#3C2818]', light: 'from-[#F0E8E0] to-[#E5D8CC]' },
  { slug: 'chaussures-accessoires', name: 'Chaussures & accessoires', icon: '👠', gradient: 'from-[#6E1F2F] to-[#4A0F1E]', light: 'from-[#F5E0E5] to-[#EBD0D8]' },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 md:py-28 bg-ivoire">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="gold-line" />
            <span className="text-or text-xs font-semibold tracking-[0.2em] uppercase">Nos catégories</span>
            <div className="gold-line" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bordeaux-dark font-semibold leading-tight">
            Tout ce qu&apos;il faut pour une dot complète
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/boutique?categorie=${cat.slug}`}
              className="group card-lift"
            >
              <div className={`rounded-2xl bg-gradient-to-br ${cat.light} border border-white/60 overflow-hidden aspect-[3/4] flex flex-col`}>
                {/* Visuel */}
                <div className={`flex-1 bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                  <span className="text-5xl">{cat.icon}</span>
                </div>
                {/* Label */}
                <div className="p-3 text-center">
                  <p className="font-serif text-bordeaux-dark text-sm font-semibold leading-tight group-hover:text-bordeaux transition-colors">
                    {cat.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 border-2 border-bordeaux text-bordeaux font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-bordeaux hover:text-ivoire transition-all duration-200"
          >
            Voir la boutique
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
