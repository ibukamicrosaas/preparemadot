import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';

type Props = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  dark?: boolean;
  showBadges?: boolean;
};

export default function CTASection({
  title = 'Vous préparez une dot ? Parlons de votre besoin.',
  subtitle = 'Une équipe bienveillante, des produits de qualité et un accompagnement sur mesure pour une dot complète, élégante et sans stress.',
  ctaLabel = 'Faire ma demande personnalisée',
  ctaHref = '/demande-personnalisee',
  secondaryLabel = 'Discuter sur WhatsApp',
  dark = true,
  showBadges = false,
}: Props) {
  const whatsappUrl = getWhatsAppUrl('default');

  return (
    <section className={`relative py-20 md:py-28 overflow-hidden ${dark ? 'bg-bordeaux-dark' : 'bg-ivoire'}`}>
      {dark && <div className="absolute inset-0 pattern-dot opacity-20 pointer-events-none" />}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${showBadges ? 'lg:grid-cols-2 gap-12 items-center' : ''}`}>
          {showBadges && (
            /* Visuel côté gauche */
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-80 h-96 rounded-[2.5rem] bg-gradient-to-br from-bordeaux/60 via-[#8B3A4A]/40 to-bordeaux-dark/80 border border-or/20 mx-auto overflow-hidden">
                  <div className="absolute inset-0 pattern-dot opacity-30" />
                  <div className="absolute inset-0 flex items-end justify-center pb-10">
                    <div className="text-center">
                      <span className="text-7xl block mb-3">🌸</span>
                      <p className="font-serif text-ivoire text-lg font-semibold">Votre dot, notre passion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Texte */}
          <div className={showBadges ? '' : 'text-center max-w-2xl mx-auto'}>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-5 ${dark ? 'text-ivoire' : 'text-bordeaux-dark'}`}>
              {title}
            </h2>
            <p className={`text-base md:text-lg leading-relaxed mb-10 ${dark ? 'text-beige/70' : 'text-brun-light'}`}>
              {subtitle}
            </p>

            <div className={`flex flex-wrap gap-3 mb-8 ${showBadges ? '' : 'justify-center'}`}>
              <Link
                href={ctaHref}
                className={`inline-flex items-center justify-center font-semibold text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-[1.02] ${dark ? 'bg-or text-bordeaux-dark hover:bg-or-light shadow-lg shadow-or/20' : 'bg-bordeaux text-ivoire hover:bg-bordeaux-dark'}`}
              >
                {ctaLabel}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-medium text-base px-8 py-4 rounded-full border transition-all duration-200 ${dark ? 'border-or/40 text-or hover:bg-or/10' : 'border-bordeaux/40 text-bordeaux hover:bg-bordeaux/10'}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a10.57 10.57 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.1 1.516 5.83L.063 23.25l5.594-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.884 0-3.636-.515-5.124-1.406l-.367-.218-3.319.871.885-3.235-.239-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                {secondaryLabel}
              </a>
            </div>

            {/* Badges de réassurance */}
            <div className={`flex flex-wrap gap-x-6 gap-y-2 ${showBadges ? '' : 'justify-center'}`}>
              {['Réponse rapide', 'Devis gratuit', 'Confidentialité garantie'].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <span className={`text-xs font-bold ${dark ? 'text-or' : 'text-bordeaux'}`}>✓</span>
                  <span className={`text-xs ${dark ? 'text-beige/50' : 'text-brun-light/70'}`}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
