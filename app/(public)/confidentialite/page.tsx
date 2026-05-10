import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité de Prepare Ma Dot.',
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <section className="py-16 md:py-24 bg-ivoire">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-brun-light/50 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-bordeaux transition-colors">Accueil</Link>
          <span>›</span>
          <span>Politique de confidentialité</span>
        </nav>

        <h1 className="font-serif text-bordeaux-dark text-3xl md:text-4xl font-semibold mb-4">
          Politique de confidentialité
        </h1>
        <p className="text-brun-light text-sm mb-10">Dernière mise à jour : mai 2026</p>

        <div className="space-y-10 text-brun-light text-sm leading-relaxed">
          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">1. Responsable du traitement</h2>
            <p>
              Les données personnelles collectées sur ce site sont traitées par <strong className="text-brun">Prepare Ma Dot</strong>,
              joignable à l&apos;adresse : <a href={`mailto:${siteConfig.email}`} className="text-bordeaux hover:underline">{siteConfig.email}</a>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">2. Données collectées</h2>
            <p>Nous collectons les données suivantes :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Via le formulaire de demande personnalisée : nom, email, numéro WhatsApp, pays, ville, date de cérémonie, budget, message</li>
              <li>Via le formulaire de contact : nom, email, message</li>
              <li>Données de navigation : adresse IP, pages consultées (via les outils d&apos;analyse anonymes)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">3. Finalités du traitement</h2>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Répondre à vos demandes d&apos;accompagnement</li>
              <li>Vous contacter sur WhatsApp (si vous avez donné votre accord)</li>
              <li>Améliorer la qualité de notre service</li>
              <li>Assurer la sécurité du site</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">4. Base légale</h2>
            <p>
              Le traitement de vos données repose sur votre consentement explicite (case à cocher dans le formulaire)
              et sur notre intérêt légitime à répondre à vos demandes commerciales.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">5. Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant une durée maximale de <strong className="text-brun">3 ans</strong> à compter
              de votre dernière interaction avec nous, sauf obligation légale contraire.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">6. Partage des données</h2>
            <p>
              Vos données ne sont jamais vendues ni cédées à des tiers à des fins commerciales.
              Elles peuvent être transmises à nos sous-traitants techniques (hébergement, emails) dans le strict cadre de la prestation.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-brun">Supabase</strong> — stockage des demandes</li>
              <li><strong className="text-brun">Resend</strong> — envoi d&apos;emails de notification</li>
              <li><strong className="text-brun">Vercel</strong> — hébergement du site</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">7. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-brun">Accès</strong> — obtenir une copie de vos données</li>
              <li><strong className="text-brun">Rectification</strong> — corriger des données inexactes</li>
              <li><strong className="text-brun">Suppression</strong> — demander l&apos;effacement de vos données</li>
              <li><strong className="text-brun">Opposition</strong> — vous opposer au traitement</li>
              <li><strong className="text-brun">Portabilité</strong> — recevoir vos données dans un format standard</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-bordeaux hover:underline">{siteConfig.email}</a>.
              En cas de désaccord, vous pouvez saisir la CNIL (<a href="https://www.cnil.fr" className="text-bordeaux hover:underline" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
            </p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">8. Cookies</h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son fonctionnement.
              Aucun cookie publicitaire ou de suivi tiers n&apos;est déposé sans votre consentement.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-3">9. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
              contre l&apos;accès non autorisé, la modification, la divulgation ou la destruction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
