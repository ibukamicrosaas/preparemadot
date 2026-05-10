export const siteConfig = {
  name: 'Prepare Ma Dot',
  tagline: 'Préparez votre dot africaine avec élégance et sérénité',
  description:
    'Prepare Ma Dot accompagne les futurs mariés et leurs familles dans la préparation, la fourniture et l\'organisation de la dot africaine, dans le respect des traditions et avec une attention particulière aux détails.',
  domain: 'preparemadot.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://preparemadot.com',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '33600000000',
  email: process.env.CONTACT_EMAIL || 'contact@preparemadot.com',
  social: {
    instagram: 'https://instagram.com/preparemadot',
    facebook: 'https://facebook.com/preparemadot',
    tiktok: 'https://tiktok.com/@preparemadot',
  },
};

export const navigation = [
  { label: 'Comment ça marche', href: '/comment-ca-marche' },
  { label: 'Boutique', href: '/boutique' },
  { label: 'Nos packs', href: '/packs' },
  { label: 'Blog', href: '/blog' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export const whatsappMessages = {
  default:
    'Bonjour, je souhaite préparer une dot et j\'aimerais être accompagné(e). Pouvez-vous m\'aider ?',
  product: (productName: string) =>
    `Bonjour, je suis intéressé(e) par ce produit : ${productName}. Pouvez-vous me donner plus d'informations ?`,
  pack: (packName: string) =>
    `Bonjour, je souhaite recevoir une proposition pour ${packName}. Pouvez-vous me contacter ?`,
  customRequest:
    'Bonjour, j\'ai rempli le formulaire de demande personnalisée et j\'aimerais être accompagné(e) dans la préparation de ma dot.',
};
