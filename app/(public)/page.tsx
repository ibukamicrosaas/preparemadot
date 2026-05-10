import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import PacksPreview from '@/components/sections/PacksPreview';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import TrustSection from '@/components/sections/TrustSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Prepare Ma Dot — Préparez votre dot africaine avec élégance et sérénité',
  description:
    "Prepare Ma Dot vous accompagne dans la préparation, la fourniture et l'organisation de votre dot africaine. Textiles, bijoux, accessoires, packs d'accompagnement — même à distance.",
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CategoriesSection />
      <PacksPreview />
      <HowItWorksSection />
      <TrustSection />
      <TestimonialsSection />
      <CTASection
        title="Vous préparez une dot ? Parlons de votre besoin"
        subtitle="Une équipe bienveillante, des produits de qualité et un accompagnement sur mesure pour une dot complète, élégante et sans stress."
        ctaLabel="Faire ma demande personnalisée"
        ctaHref="/demande-personnalisee"
        secondaryLabel="Discuter sur WhatsApp"
        showBadges
      />
    </>
  );
}
