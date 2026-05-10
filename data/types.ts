export type ProductCategory =
  | 'textiles-traditionnels'
  | 'tenues-traditionnelles'
  | 'chaussures-accessoires'
  | 'sacs-maroquinerie'
  | 'bijoux-parures'
  | 'produits-symboliques'
  | 'boissons-cadeaux'
  | 'paniers-valises-presentation';

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  description?: string;
  price?: number;
  priceLabel?: string;
  isPriceOnRequest?: boolean;
  availability: 'available' | 'unavailable' | 'on_request';
  images: string[];
  featured?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type Category = {
  id: ProductCategory;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
};

export type ServicePack = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  inclusions: string[];
  priceLabel: string;
  featured?: boolean;
  ctaLabel: string;
  highlight?: string;
  order: number;
};

export type CustomRequest = {
  id?: string;
  fullName: string;
  email: string;
  whatsapp: string;
  residenceCountry?: string;
  targetCity?: string;
  cultureOrCountry?: string;
  ceremonyDate?: string;
  estimatedBudget?: string;
  needType:
    | 'products_only'
    | 'list_help'
    | 'complete_pack'
    | 'remote_organization'
    | 'advice'
    | 'other';
  hasExistingList?: 'yes' | 'no' | 'not_sure';
  message?: string;
  consentToContact: boolean;
  createdAt?: string;
  status?: 'new' | 'contacted' | 'quote_sent' | 'converted' | 'lost';
};
