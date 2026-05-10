import type { ServicePack } from './types';

export const packs: ServicePack[] = [
  {
    id: 'pack-essentiel',
    name: 'Pack Essentiel',
    slug: 'pack-essentiel',
    shortDescription: 'Pour ceux qui savent ce qu\'ils veulent et ont besoin d\'aide pour trouver les produits essentiels.',
    description: 'Vous avez déjà une idée de ce que vous souhaitez offrir lors de la dot, mais vous manquez de temps pour trouver les bons produits. Le Pack Essentiel vous accompagne dans la sélection et la préparation des éléments de base.',
    inclusions: [
      'Consultation initiale pour comprendre votre besoin',
      'Sélection de produits essentiels selon votre liste',
      'Préparation simple et soignée des éléments',
      'Photos de validation avant remise',
      'Remise en main propre ou coordination de livraison',
    ],
    priceLabel: 'Sur devis',
    ctaLabel: 'Demander le Pack Essentiel',
    order: 1,
  },
  {
    id: 'pack-tradition',
    name: 'Pack Tradition',
    slug: 'pack-tradition',
    shortDescription: 'Pour les familles qui souhaitent une dot complète, harmonieuse et bien présentée.',
    description: 'La dot est un moment important qui mérite une préparation à la hauteur. Le Pack Tradition vous offre un accompagnement complet : de la composition à la présentation finale, dans le respect des traditions de votre culture.',
    inclusions: [
      'Consultation approfondie sur les traditions et attentes familiales',
      'Aide à la composition de la liste complète',
      'Sélection et achat des produits selon votre culture',
      'Présentation soignée dans des paniers ou valises',
      'Coordination avec les membres de la famille',
      'Photos et vidéos de validation',
      'Remise organisée ou coordination de livraison',
    ],
    priceLabel: 'Sur devis',
    ctaLabel: 'Demander le Pack Tradition',
    highlight: 'Le plus populaire',
    featured: true,
    order: 2,
  },
  {
    id: 'pack-premium',
    name: 'Pack Premium À Distance',
    slug: 'pack-premium-a-distance',
    shortDescription: 'Pour la diaspora et les familles éloignées qui souhaitent déléguer entièrement la préparation.',
    description: 'Vous vivez à l\'étranger ou dans une autre ville et ne pouvez pas être présent(e) pour préparer la dot ? Nous prenons tout en charge à distance, avec un suivi personnalisé, des photos et vidéos à chaque étape, jusqu\'à la remise finale.',
    inclusions: [
      'Accompagnement complet à distance (WhatsApp, appels vidéo)',
      'Conseil sur les traditions selon votre culture',
      'Aide à la composition et validation de la liste',
      'Achat, sélection et assemblage de tous les éléments',
      'Présentation élégante dans des paniers et valises décorées',
      'Photos et vidéos tout au long du processus',
      'Coordination avec votre famille sur place',
      'Livraison organisée ou remise à un représentant désigné',
    ],
    priceLabel: 'Sur devis',
    ctaLabel: 'Demander un accompagnement Premium',
    order: 3,
  },
];

export function getPackBySlug(slug: string): ServicePack | undefined {
  return packs.find((p) => p.slug === slug);
}
