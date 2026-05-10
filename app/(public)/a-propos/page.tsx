import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Discover notre mission : accompagner les futurs mariés et leurs familles dans la préparation de la dot africaine avec élégance, tradition et sérénité.',
  alternates: { canonical: '/a-propos' },
};

const values = [
  {
    icon: '🏛️',
    title: 'Respect des traditions',
    description: 'Chaque culture a ses propres codes. Nous prenons le temps de les comprendre pour vous proposer une dot qui honore votre héritage.',
  },
  {
    icon: '❤️',
    title: 'Accompagnement humain',
    description: 'Nous ne sommes pas une boutique en ligne froide. Nous sommes une équipe à l\'écoute, disponible pour répondre à chaque question.',
  },
  {
    icon: '✨',
    title: 'Élégance dans les détails',
    description: 'De la sélection des produits à leur présentation, chaque détail compte. Votre dot mérite d\'être belle et mémorable.',
  },
  {
    icon: '🌍',
    title: 'Accessible à distance',
    description: 'Qu\'on soit en France, en Belgique ou ailleurs, on s\'adapte. Aucune frontière ne doit empêcher une belle dot.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bordeaux-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-or/20 border border-or/30 text-or text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Notre histoire
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivoire font-semibold leading-tight">
            Préparer une dot comme il se doit
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-ivoire">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-or tracking-widest uppercase block mb-4">Notre mission</span>
              <h2 className="font-serif text-bordeaux-dark text-3xl md:text-4xl font-semibold leading-tight mb-6">
                Faciliter la dot sans dénaturer les traditions
              </h2>
              <div className="space-y-4 text-brun-light text-base leading-relaxed">
                <p>
                  La dot africaine est bien plus qu&apos;un échange de cadeaux. C&apos;est un acte de respect, d&apos;amour et de reconnaissance entre deux familles. C&apos;est un moment chargé d&apos;émotion, d&apos;histoire et de tradition.
                </p>
                <p>
                  Chez Prepare Ma Dot, nous avons voulu créer un service qui aide les futurs mariés et leurs familles à vivre ce moment avec élégance et sérénité — sans le stress des recherches, des oublis ou des distances.
                </p>
                <p>
                  Notre promesse est simple : nous prenons soin de chaque détail pour que vous puissiez vous concentrer sur l&apos;essentiel — célébrer cet engagement avec ceux que vous aimez.
                </p>
              </div>
            </div>

            <div className="bg-beige rounded-3xl p-10 text-center space-y-6">
              <span className="text-5xl block">🌸</span>
              <blockquote className="font-serif text-bordeaux-dark text-xl font-medium leading-relaxed italic">
                &ldquo;Une dot bien préparée est un acte d&apos;amour. Nous sommes là pour vous aider à l&apos;offrir avec tout le soin qu&apos;il mérite.&rdquo;
              </blockquote>
              <p className="text-brun-light text-sm">L&apos;équipe Prepare Ma Dot</p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-beige">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-or tracking-widest uppercase block mb-3">Ce qui nous guide</span>
            <h2 className="font-serif text-bordeaux-dark text-3xl md:text-4xl font-semibold">Nos valeurs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-ivoire rounded-2xl p-6 text-center">
                <span className="text-3xl block mb-4">{value.icon}</span>
                <h3 className="font-serif text-bordeaux-dark font-semibold text-lg mb-3">{value.title}</h3>
                <p className="text-brun-light text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Importance culturelle */}
      <section className="py-20 bg-ivoire">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold text-or tracking-widest uppercase block mb-4">La dot africaine</span>
          <h2 className="font-serif text-bordeaux-dark text-3xl md:text-4xl font-semibold mb-6 leading-tight">
            Un moment sacré que nous traitons avec respect
          </h2>
          <div className="space-y-4 text-brun-light text-base leading-relaxed text-left">
            <p>
              La dot est l&apos;un des rituels les plus importants du mariage africain. Elle symbolise la reconnaissance de la famille de la jeune mariée, le sérieux du prétendant et l&apos;union de deux lignées.
            </p>
            <p>
              Chaque culture, chaque région, chaque famille a ses propres traditions. Ce qui est attendu au Congo peut différer de ce qui se pratique au Cameroun, au Sénégal ou en Côte d&apos;Ivoire. C&apos;est pourquoi nous personnalisons chaque accompagnement.
            </p>
            <p>
              Notre équipe comprend ces nuances et prend le temps d&apos;apprendre vos codes. Nous ne proposons jamais une liste générique — nous construisons avec vous ce qui correspond à votre famille.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Parlons de votre dot"
        subtitle="Chaque projet est unique. Contactez-nous pour que nous comprenions vos besoins et vous accompagnions au mieux."
        ctaLabel="Faire une demande"
        ctaHref="/demande-personnalisee"
        secondaryLabel="Écrire sur WhatsApp"
      />
    </>
  );
}
