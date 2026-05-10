import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import ContactFormWrapper from '@/components/forms/ContactFormWrapper';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez l\'équipe Prepare Ma Dot. Nous sommes disponibles via WhatsApp et email pour répondre à toutes vos questions.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl('default');

  return (
    <>
      {/* Hero */}
      <section className="bg-bordeaux-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-or/20 border border-or/30 text-or text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Nous contacter
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-ivoire font-semibold leading-tight mb-4">
            Une question ? On est là.
          </h1>
          <p className="text-beige/70 text-lg leading-relaxed max-w-xl mx-auto">
            Notre équipe est disponible pour répondre à vos questions, vous guider dans votre projet ou simplement discuter de votre besoin.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-20 bg-ivoire">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Informations de contact */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-bordeaux-dark text-2xl font-semibold mb-6">
                  Parlons de votre projet
                </h2>
                <p className="text-brun-light text-base leading-relaxed">
                  La meilleure façon de démarrer est de nous écrire directement. Nous répondons rapidement et prenons le temps de comprendre votre situation.
                </p>
              </div>

              {/* WhatsApp */}
              <div className="bg-beige rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#25D366]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.1 1.516 5.83L.063 23.25l5.594-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.884 0-3.636-.515-5.124-1.406l-.367-.218-3.319.871.885-3.235-.239-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-bordeaux-dark text-sm mb-1">WhatsApp</h3>
                    <p className="text-brun-light text-xs mb-3">Réponse rapide — canal privilégié</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#25D366] hover:underline"
                    >
                      Écrire sur WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-beige rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-or/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#C8A24A" strokeWidth="2" className="w-5 h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-bordeaux-dark text-sm mb-1">Email</h3>
                    <p className="text-brun-light text-xs mb-2">Réponse sous 24-48h</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-medium text-or hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div>
                <h3 className="font-serif text-bordeaux-dark font-semibold text-sm mb-3">Suivez-nous</h3>
                <div className="flex gap-3">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-beige text-brun-light hover:text-bordeaux hover:bg-beige/80 px-4 py-2 rounded-full font-medium transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-beige text-brun-light hover:text-bordeaux hover:bg-beige/80 px-4 py-2 rounded-full font-medium transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-3">
              <div className="bg-beige rounded-3xl p-8">
                <h2 className="font-serif text-bordeaux-dark text-2xl font-semibold mb-2">
                  Envoyez-nous un message
                </h2>
                <p className="text-brun-light text-sm mb-7">
                  Pour une demande de dot complète, utilisez plutôt notre{' '}
                  <a href="/demande-personnalisee" className="text-bordeaux font-medium hover:underline">
                    formulaire de demande personnalisée
                  </a>
                  .
                </p>
                <ContactFormWrapper />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
