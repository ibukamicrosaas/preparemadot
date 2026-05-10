import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a10.57 10.57 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.1 1.516 5.83L.063 23.25l5.594-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.884 0-3.636-.515-5.124-1.406l-.367-.218-3.319.871.885-3.235-.239-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function Hero() {
  return (
    <section className="relative bg-bordeaux-dark overflow-hidden">
      {/* Texture décorative */}
      <div className="absolute inset-0 pattern-dot opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[88vh] items-center">

          {/* ── Colonne gauche : contenu ── */}
          <div className="py-20 lg:py-28 lg:pr-12">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <div className="gold-line" />
              <span className="text-or text-xs font-semibold tracking-[0.2em] uppercase">
                Votre dot, notre expertise
              </span>
            </div>

            {/* Titre */}
            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-ivoire font-semibold leading-[1.15] mb-6 animate-fade-up animate-fade-up-1">
              Préparez votre dot africaine avec{' '}
              <span className="text-gradient-or italic">élégance</span>
              {' '}et{' '}
              <span className="text-gradient-or italic">sérénité</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-beige/70 text-base sm:text-lg leading-relaxed mb-10 max-w-lg animate-fade-up animate-fade-up-2">
              Prepare Ma Dot vous accompagne pour composer, acheter et organiser chaque élément de votre dot, même à distance. Nous respectons vos traditions et vous offrons une préparation soignée, complète et sans stress.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12 animate-fade-up animate-fade-up-3">
              <Link
                href="/demande-personnalisee"
                className="inline-flex items-center justify-center bg-or text-bordeaux-dark font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-or-light transition-all duration-200 shadow-lg shadow-or/20 hover:shadow-or/30 hover:scale-[1.02]"
              >
                Préparer ma dot
              </Link>
              <a
                href={getWhatsAppUrl('default')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-or/40 text-or font-medium text-sm sm:text-base px-7 py-3.5 rounded-full hover:bg-or/10 transition-all duration-200"
              >
                <WhatsAppIcon />
                Écrire sur WhatsApp
              </a>
            </div>

            {/* Réassurances */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 animate-fade-up animate-fade-up-4">
              {[
                { icon: '🤝', label: 'Accompagnement humain' },
                { icon: '🌍', label: 'Même à distance' },
                { icon: '🏛️', label: 'Respect des traditions' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-beige/60 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Colonne droite : visuel ── */}
          <div className="hidden lg:flex items-center justify-center relative h-full py-16">
            {/* Cercle décoratif arrière */}
            <div className="absolute w-[480px] h-[480px] rounded-full border border-or/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[560px] h-[560px] rounded-full border border-or/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Composition centrale */}
            <div className="relative w-[420px] h-[520px]">
              {/* Cadre principal */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-bordeaux/60 via-[#8B3A4A]/40 to-bordeaux-dark/80 border border-or/20 overflow-hidden">
                {/* Grille décorative intérieure */}
                <div className="absolute inset-0 pattern-grid opacity-30" />

                {/* Contenu décoratif */}
                <div className="absolute inset-6 flex flex-col gap-4">
                  {/* Rangée haute */}
                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="bg-gradient-to-br from-[#8B5E2B]/60 to-[#6B4020]/60 rounded-2xl flex flex-col items-center justify-center border border-or/15 p-4">
                      <span className="text-4xl mb-2">🧵</span>
                      <span className="text-or/70 text-xs font-medium tracking-wide">Textiles</span>
                    </div>
                    <div className="bg-gradient-to-br from-[#C8A24A]/20 to-[#A07830]/20 rounded-2xl flex flex-col items-center justify-center border border-or/20 p-4">
                      <span className="text-4xl mb-2">💍</span>
                      <span className="text-or/70 text-xs font-medium tracking-wide">Bijoux</span>
                    </div>
                  </div>
                  {/* Bannière centrale */}
                  <div className="bg-or/15 rounded-2xl border border-or/30 px-5 py-4 flex items-center gap-4">
                    <span className="text-3xl">🧺</span>
                    <div>
                      <p className="font-serif text-ivoire text-sm font-semibold leading-snug">Dot complète</p>
                      <p className="text-or/60 text-xs mt-0.5">préparée avec soin</p>
                    </div>
                    <div className="ml-auto w-8 h-8 bg-or/20 rounded-full flex items-center justify-center">
                      <span className="text-or text-lg">✓</span>
                    </div>
                  </div>
                  {/* Rangée basse */}
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    <div className="bg-gradient-to-br from-[#3A2010]/60 to-[#2A1808]/60 rounded-2xl flex flex-col items-center justify-center border border-or/10 p-3">
                      <span className="text-2xl mb-1">🌿</span>
                      <span className="text-beige/50 text-[10px]">Symbolique</span>
                    </div>
                    <div className="bg-gradient-to-br from-[#6B1A2A]/60 to-[#4A0F1A]/60 rounded-2xl flex flex-col items-center justify-center border border-bordeaux/40 p-3">
                      <span className="text-2xl mb-1">🍾</span>
                      <span className="text-beige/50 text-[10px]">Boissons</span>
                    </div>
                    <div className="bg-gradient-to-br from-[#4A3020]/60 to-[#2A1A0A]/60 rounded-2xl flex flex-col items-center justify-center border border-or/10 p-3">
                      <span className="text-2xl mb-1">👜</span>
                      <span className="text-beige/50 text-[10px]">Maroquin.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -top-4 -right-4 bg-or text-bordeaux-dark rounded-2xl px-4 py-2.5 shadow-xl shadow-or/30">
                <p className="font-serif font-semibold text-sm leading-tight">Prêt à livrer</p>
                <p className="text-bordeaux text-xs opacity-70">partout dans le monde</p>
              </div>

              {/* Badge flottant bas */}
              <div className="absolute -bottom-3 -left-4 bg-bordeaux-dark border border-or/30 text-ivoire rounded-2xl px-4 py-2.5 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">⭐</span>
                  <div>
                    <p className="text-xs font-semibold">Tradition préservée</p>
                    <p className="text-beige/50 text-[10px]">culture & respect</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vague de transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-beige/20 to-transparent pointer-events-none" />
    </section>
  );
}
