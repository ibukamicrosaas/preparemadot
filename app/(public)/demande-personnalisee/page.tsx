import type { Metadata } from 'next';
import CustomRequestForm from '@/components/forms/CustomRequestForm';

export const metadata: Metadata = {
  title: 'Faire une demande personnalisée',
  description:
    'Décrivez votre projet de dot africaine. L\'équipe Prepare Ma Dot vous contacte rapidement pour vous proposer un accompagnement sur mesure.',
  alternates: { canonical: '/demande-personnalisee' },
};

export default function CustomRequestPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bordeaux-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-or/20 border border-or/30 text-or text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Demande personnalisée
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-ivoire font-semibold leading-tight mb-4">
            Parlons de votre dot
          </h1>
          <p className="text-beige/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Remplissez ce formulaire en quelques minutes. Notre équipe vous contactera rapidement sur WhatsApp pour comprendre votre besoin et vous proposer la solution la plus adaptée.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-14 md:py-20 bg-ivoire">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <CustomRequestForm />
        </div>
      </section>
    </>
  );
}
