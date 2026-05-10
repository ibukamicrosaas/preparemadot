import Link from 'next/link';
import { siteConfig, navigation } from '@/data/site';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-bordeaux-dark text-beige/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Marque */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <span className="font-serif text-or text-2xl font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="text-sm leading-relaxed text-beige/60 max-w-xs">
              Accompagnement premium dans la préparation de la dot africaine. Tradition, élégance et sérénité.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige/50 hover:text-or transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige/50 hover:text-or transition-colors"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-or font-medium mb-5">Navigation</h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-beige/60 hover:text-or transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/demande-personnalisee" className="text-sm text-or/80 hover:text-or transition-colors font-medium">
                  Faire une demande →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-or font-medium mb-5">Nous contacter</h3>
            <div className="space-y-3 text-sm text-beige/60">
              <p>
                Pour toute question ou demande d&apos;accompagnement, notre équipe est disponible via WhatsApp.
              </p>
              <a
                href={getWhatsAppUrl('default')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-or hover:text-or-light transition-colors font-medium mt-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.1 1.516 5.83L.063 23.25l5.594-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.884 0-3.636-.515-5.124-1.406l-.367-.218-3.319.871.885-3.235-.239-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Écrire sur WhatsApp
              </a>
              <p className="text-beige/40 text-xs mt-4">
                {siteConfig.email}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-beige/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-beige/40">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/confidentialite" className="hover:text-beige/60 transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/mentions-legales" className="hover:text-beige/60 transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
