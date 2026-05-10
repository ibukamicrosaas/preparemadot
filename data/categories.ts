import type { Category } from './types';

export const categories: Category[] = [
  {
    id: 'textiles-traditionnels',
    name: 'Textiles traditionnels',
    slug: 'textiles-traditionnels',
    description: 'Pagnes, wax, bazin, kente et autres tissus précieux pour la dot',
    icon: '🧵',
    order: 1,
  },
  {
    id: 'tenues-traditionnelles',
    name: 'Tenues traditionnelles',
    slug: 'tenues-traditionnelles',
    description: 'Robes, ensembles et vêtements de cérémonie pour la future mariée',
    icon: '👗',
    order: 2,
  },
  {
    id: 'chaussures-accessoires',
    name: 'Chaussures & accessoires',
    slug: 'chaussures-accessoires',
    description: 'Chaussures, ceintures, écharpes et accessoires assortis',
    icon: '👠',
    order: 3,
  },
  {
    id: 'sacs-maroquinerie',
    name: 'Sacs & maroquinerie',
    slug: 'sacs-maroquinerie',
    description: 'Sacs à main, pochettes et articles de maroquinerie de qualité',
    icon: '👜',
    order: 4,
  },
  {
    id: 'bijoux-parures',
    name: 'Bijoux & parures',
    slug: 'bijoux-parures',
    description: 'Colliers, bracelets, boucles d\'oreilles et parures traditionnelles',
    icon: '💍',
    order: 5,
  },
  {
    id: 'produits-symboliques',
    name: 'Produits symboliques',
    slug: 'produits-symboliques',
    description: 'Noix de cola, sel, miel et autres éléments symboliques de la dot',
    icon: '🌿',
    order: 6,
  },
  {
    id: 'boissons-cadeaux',
    name: 'Boissons & cadeaux',
    slug: 'boissons-cadeaux',
    description: 'Boissons traditionnelles, alcools, parfums et cadeaux d\'usage',
    icon: '🍾',
    order: 7,
  },
  {
    id: 'paniers-valises-presentation',
    name: 'Présentation & emballage',
    slug: 'paniers-valises-presentation',
    description: 'Paniers, valises, malles et solutions de présentation élégante',
    icon: '🧺',
    order: 8,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
