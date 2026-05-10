import type { Metadata } from 'next';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Merci pour votre demande',
  robots: { index: false },
};

export default function MerciPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-ivoire py-20 px-4">
      <div className="max-w-xl w-full text-center">
        <span className="text-6xl block mb-6">🎉</span>
        <h1 className="font-serif text-bordeaux-dark text-3xl md:text-4xl font-semibold mb-4 leading-tight">
          Votre demande a bien été reçue
        </h1>
        <p className="text-brun-light text-base leading-relaxed mb-8">
          Merci pour votre confiance. L&apos;équipe Prepare Ma Dot vous contactera rapidement sur WhatsApp pour mieux comprendre votre besoin et vous proposer la solution la plus adaptée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={getWhatsAppUrl('customRequest')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-[#1DAA57] transition-colors"
          >
            Nous écrire maintenant
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center border-2 border-bordeaux text-bordeaux font-medium text-sm px-7 py-4 rounded-full hover:bg-bordeaux hover:text-ivoire transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
