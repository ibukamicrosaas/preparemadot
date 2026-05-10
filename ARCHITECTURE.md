# ARCHITECTURE.md — Prepare Ma Dot

## 1. Objectif architectural

L'architecture doit permettre de construire rapidement une V1 professionnelle de Prepare Ma Dot, tout en gardant une base saine pour les évolutions futures.

La priorité est :

- simplicité ;
- maintenabilité ;
- performance mobile ;
- facilité de modification du contenu ;
- conversion ;
- évolutivité raisonnable.

---

## 2. Stack recommandée

### Frontend / Fullstack

- Next.js avec App Router
- TypeScript
- Tailwind CSS

### UI

- Composants internes réutilisables
- Option : shadcn/ui si le projet en a besoin, mais ne pas surcharger

### Données

Deux options possibles :

#### Option A — V1 simple avec données statiques

Utiliser des fichiers TypeScript/JSON pour :

- produits ;
- catégories ;
- packs ;
- contenus de pages ;
- configuration WhatsApp.

Avantage : rapide, simple, stable.

#### Option B — V1 dynamique avec Supabase

Utiliser Supabase pour :

- produits ;
- demandes personnalisées ;
- uploads ;
- packs ;
- statuts internes.

Avantage : plus évolutif, mais plus long à mettre en place.

### Recommandation

Pour démarrer rapidement :

- données produits et packs en statique ;
- demandes personnalisées envoyées par email + stockées si Supabase est disponible ;
- prévoir une migration future vers CMS/base de données.

---

## 3. Arborescence recommandée

```txt
prepare-ma-dot/
  app/
    layout.tsx
    page.tsx
    comment-ca-marche/
      page.tsx
    boutique/
      page.tsx
    boutique/[slug]/
      page.tsx
    packs/
      page.tsx
    demande-personnalisee/
      page.tsx
    a-propos/
      page.tsx
    contact/
      page.tsx
    merci/
      page.tsx
    api/
      contact/
        route.ts
      custom-request/
        route.ts
  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileNav.tsx
    sections/
      Hero.tsx
      ProblemSection.tsx
      SolutionSection.tsx
      CategoriesSection.tsx
      PacksPreview.tsx
      HowItWorksPreview.tsx
      TrustSection.tsx
      CTASection.tsx
    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      Input.tsx
      Textarea.tsx
      Select.tsx
      FileUpload.tsx
    product/
      ProductCard.tsx
      ProductGrid.tsx
      ProductFilters.tsx
      ProductDetail.tsx
    pack/
      PackCard.tsx
      PackGrid.tsx
    forms/
      ContactForm.tsx
      CustomRequestForm.tsx
    shared/
      WhatsAppButton.tsx
      SectionHeader.tsx
      ImageGallery.tsx
  data/
    products.ts
    categories.ts
    packs.ts
    site.ts
    navigation.ts
    seo.ts
  lib/
    utils.ts
    whatsapp.ts
    validators.ts
    email.ts
    analytics.ts
  public/
    images/
    icons/
  styles/
    globals.css
  .env.example
  README.md
```

---

## 4. Modèle de données

## 4.1 Product

```ts
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
```

---

## 4.2 Category

```ts
export type Category = {
  id: ProductCategory;
  name: string;
  slug: string;
  description: string;
  image?: string;
  order: number;
};
```

---

## 4.3 Pack

```ts
export type ServicePack = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  inclusions: string[];
  priceLabel: string;
  image?: string;
  featured?: boolean;
  ctaLabel: string;
  order: number;
};
```

---

## 4.4 CustomRequest

```ts
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
  fileUrl?: string;
  consentToContact: boolean;
  createdAt?: string;
  status?: 'new' | 'contacted' | 'quote_sent' | 'converted' | 'lost';
};
```

---

## 5. Routes et pages

### `/`

Page d'accueil.

Objectif : expliquer, rassurer, convertir.

### `/comment-ca-marche`

Explication du parcours.

### `/boutique`

Listing produits.

### `/boutique/[slug]`

Fiche produit.

### `/packs`

Présentation des offres d'accompagnement.

### `/demande-personnalisee`

Formulaire principal de génération de leads.

### `/a-propos`

Mission, histoire, valeurs.

### `/contact`

Contact court + WhatsApp.

### `/merci`

Confirmation après formulaire.

---

## 6. API routes

## 6.1 `/api/custom-request`

Méthode : `POST`

Responsabilités :

- valider les données ;
- protéger contre le spam ;
- stocker la demande si base disponible ;
- envoyer notification email ;
- retourner succès/erreur.

Payload attendu :

```ts
CustomRequest
```

Réponse succès :

```json
{
  "success": true,
  "message": "Votre demande a bien été envoyée."
}
```

Réponse erreur :

```json
{
  "success": false,
  "message": "Une erreur est survenue. Veuillez réessayer."
}
```

---

## 6.2 `/api/contact`

Méthode : `POST`

Pour les messages simples de la page contact.

---

## 7. Validation des formulaires

Utiliser Zod ou validation équivalente.

Règles :

- nom requis ;
- email valide requis ;
- WhatsApp requis ;
- consentement requis ;
- message optionnel mais limité ;
- budget optionnel ;
- date optionnelle ;
- fichier optionnel avec limites de taille/type.

Types de fichiers autorisés si upload :

- PDF ;
- JPG ;
- PNG ;
- WEBP.

Taille max recommandée : 5 Mo.

---

## 8. Gestion WhatsApp

Créer un helper :

```ts
export function buildWhatsAppUrl(message: string): string
```

La configuration doit être centralisée :

```ts
export const siteConfig = {
  name: 'Prepare Ma Dot',
  domain: 'preparemadot.com',
  whatsappNumber: '',
  email: '',
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
  },
};
```

Ne pas hardcoder le numéro dans plusieurs fichiers.

---

## 9. SEO et metadata

Utiliser les metadata Next.js.

Chaque page doit avoir :

- title ;
- description ;
- openGraph ;
- canonical si nécessaire.

Prévoir :

- `sitemap.ts` ;
- `robots.ts` ;
- image OG dans `/public`.

---

## 10. Analytics

Prévoir une abstraction simple :

```ts
trackEvent('whatsapp_click', { source: 'product_detail', product: product.name })
trackEvent('custom_request_submit', { needType })
trackEvent('pack_click', { pack: pack.name })
```

L'intégration peut être branchée plus tard.

---

## 11. Paiement

Pour la V1, ne pas rendre le paiement obligatoire sauf instruction contraire.

Architecture recommandée :

- CTA produits vers WhatsApp ou formulaire ;
- prix affichable si disponible ;
- champ `isPriceOnRequest` pour les prix variables ;
- possibilité future d'ajouter checkout.

Prévoir une structure compatible avec paiement futur :

```ts
paymentMode?: 'none' | 'manual' | 'online';
```

---

## 12. Sécurité

- Valider toutes les entrées côté serveur.
- Ne pas exposer les variables sensibles côté client.
- Protéger les API routes contre le spam.
- Limiter les uploads.
- Nettoyer les messages utilisateur.
- Utiliser HTTPS en production.

---

## 13. Accessibilité

- Labels associés aux champs.
- Navigation clavier.
- Contraste suffisant.
- `alt` sur les images.
- Boutons avec libellés clairs.
- Messages d'erreur compréhensibles.

---

## 14. Performance

- Optimiser les images avec `next/image`.
- Limiter les animations lourdes.
- Éviter les dépendances inutiles.
- Charger les scripts analytics de façon non bloquante.
- Prioriser le rendu rapide de l'accueil.

---

## 15. Déploiement

Déploiement recommandé : Vercel.

Variables d'environnement possibles :

```env
NEXT_PUBLIC_SITE_URL=https://preparemadot.com
NEXT_PUBLIC_WHATSAPP_NUMBER=
CONTACT_EMAIL=
RESEND_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
UPLOAD_PROVIDER_KEY=
ANALYTICS_ID=
```

---

## 16. Évolutions futures

Prévoir sans développer dès maintenant :

- multilingue français/anglais ;
- CMS complet ;
- paiement en ligne ;
- espace client ;
- espace partenaire ;
- dashboard demandes ;
- checklist interactive ;
- devis automatique ;
- blog SEO ;
- intégration CRM ;
- automatisations WhatsApp/email.

---

## 17. Décision architecturale clé

La V1 doit rester simple.

Toute complexité doit être justifiée par l'objectif suivant :

> Aider Prepare Ma Dot à recevoir ses premières demandes qualifiées et démarrer ses ventes.

Si une fonctionnalité ne sert pas cet objectif, elle doit être reportée.
