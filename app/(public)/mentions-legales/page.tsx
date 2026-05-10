import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Prepare Ma Dot.',
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <section className="py-16 md:py-24 bg-ivoire">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-brun-light/50 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-bordeaux transition-colors">Accueil</Link>
          <span>›</span>
          <span>Mentions légales</span>
        </nav>

        <h1 className="font-serif text-bordeaux-dark text-3xl md:text-4xl font-semibold mb-10">
          Mentions légales
        </h1>

        <div className="space-y-10 text-brun-light text-sm leading-relaxed">
          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">Éditeur du site</h2>
            <p><strong className="text-brun">Raison sociale :</strong> Prepare Ma Dot</p>
            <p><strong className="text-brun">Email :</strong> {siteConfig.email}</p>
            <p><strong className="text-brun">Site web :</strong> {siteConfig.domain}</p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">Hébergement</h2>
            <p>Ce site est hébergé par :</p>
            <p><strong className="text-brun">Vercel Inc.</strong></p>
            <p>340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
            <p><a href="https://vercel.com" className="text-bordeaux hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, graphismes, logos, icônes, sons, logiciels) est la propriété exclusive de Prepare Ma Dot, sauf mentions contraires.
              Toute reproduction, distribution, modification ou publication de ces éléments est strictement interdite sans autorisation écrite préalable.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">Responsabilité</h2>
            <p>
              Prepare Ma Dot s&apos;efforce de fournir des informations aussi précises que possible.
              Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour des informations diffusées.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">Données personnelles</h2>
            <p>
              Pour toute information relative au traitement de vos données personnelles, veuillez consulter notre{' '}
              <Link href="/confidentialite" className="text-bordeaux hover:underline font-medium">
                politique de confidentialité
              </Link>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">Contact</h2>
            <p>
              Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter à l&apos;adresse :{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-bordeaux hover:underline">{siteConfig.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
