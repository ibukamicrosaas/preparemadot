# PLAN.md — Plan d'exécution Prepare Ma Dot

## Objectif du plan

Construire et lancer la V1 de Prepare Ma Dot de manière rapide, structurée et professionnelle.

Cette V1 doit être assez complète pour permettre le démarrage commercial, mais assez simple pour éviter les retards et les coûts inutiles.

---

## Phase 0 — Préparation

### Objectif

Clarifier le périmètre et préparer les bases.

### Tâches

- Lire `PRD.md`.
- Lire `ARCHITECTURE.md`.
- Lire `AI_RULES.md`.
- Confirmer la stack technique.
- Initialiser le projet.
- Configurer TypeScript, Tailwind, linting et structure de dossiers.
- Créer les constantes de configuration du site.
- Préparer les données mockées produits, catégories et packs.

### Livrables

- Projet initialisé.
- Structure de base prête.
- Données mockées initiales.

---

## Phase 1 — Fondations UI et layout

### Objectif

Mettre en place l'identité visuelle, le layout et les composants réutilisables.

### Tâches

- Configurer les couleurs dans Tailwind.
- Configurer les typographies.
- Créer le layout global.
- Créer le header desktop/mobile.
- Créer le footer.
- Créer les composants UI de base : boutons, cards, inputs, textarea, select, badges.
- Créer le bouton WhatsApp flottant.
- Créer les helpers CTA et WhatsApp.

### Livrables

- Layout complet.
- Navigation fonctionnelle.
- Système visuel cohérent.
- Composants réutilisables.

---

## Phase 2 — Page d'accueil

### Objectif

Construire une page d'accueil premium, claire et orientée conversion.

### Sections à construire

- Hero
- Problème
- Solution
- Catégories
- Packs en aperçu
- Comment ça marche en aperçu
- Confiance / bénéfices
- CTA final

### Critères d'acceptation

- Le service est compris en moins de 10 secondes.
- Les CTA principaux sont visibles.
- Le rendu mobile est excellent.
- L'ambiance est premium, chaude et culturelle.

---

## Phase 3 — Pages de contenu

### Objectif

Créer les pages nécessaires pour expliquer et rassurer.

### Pages

#### `/comment-ca-marche`

- parcours en 4 étapes ;
- explication de l'accompagnement ;
- CTA vers demande personnalisée.

#### `/a-propos`

- mission ;
- vision ;
- respect des traditions ;
- promesse de marque.

#### `/contact`

- formulaire court ;
- WhatsApp ;
- réseaux sociaux ;
- coordonnées.

### Critères d'acceptation

- Pages claires et cohérentes.
- CTA présents.
- Ton humain et rassurant.

---

## Phase 4 — Boutique et produits

### Objectif

Permettre aux visiteurs de consulter les produits disponibles.

### Tâches

- Créer les catégories.
- Créer les données produits mockées.
- Construire la page `/boutique`.
- Ajouter filtres simples par catégorie.
- Créer les cartes produits.
- Créer la page produit `/boutique/[slug]`.
- Ajouter CTA WhatsApp contextuel.
- Ajouter CTA demande personnalisée.

### Critères d'acceptation

- Les produits sont listés proprement.
- La fiche produit est claire.
- Le prix peut être fixe ou “sur demande”.
- Le CTA WhatsApp fonctionne avec message prérempli.

---

## Phase 5 — Packs / Services

### Objectif

Présenter les offres d'accompagnement de manière claire.

### Packs à intégrer

1. Pack Essentiel
2. Pack Tradition
3. Pack Premium / À distance

### Tâches

- Créer données packs.
- Construire la page `/packs`.
- Créer `PackCard`.
- Ajouter inclusions.
- Ajouter CTA vers formulaire personnalisé.
- Préremplir éventuellement le type de demande via query param.

### Critères d'acceptation

- Les 3 packs sont compréhensibles.
- La valeur d'accompagnement est claire.
- Les CTA orientent vers la demande.

---

## Phase 6 — Formulaire demande personnalisée

### Objectif

Créer le moteur principal de génération de leads.

### Tâches frontend

- Créer la page `/demande-personnalisee`.
- Construire le formulaire complet.
- Ajouter validations côté client.
- Ajouter états loading/success/error.
- Ajouter messages d'aide.
- Ajouter consentement contact WhatsApp.

### Tâches backend

- Créer API route `/api/custom-request`.
- Valider les données côté serveur.
- Envoyer email de notification.
- Stocker la demande si base disponible.
- Gérer erreurs.

### Champs

- nom complet ;
- email ;
- WhatsApp ;
- pays de résidence ;
- ville cible ;
- culture/pays concerné ;
- date prévue ;
- budget ;
- type de besoin ;
- liste déjà disponible ;
- message ;
- fichier optionnel ;
- consentement.

### Critères d'acceptation

- Le formulaire fonctionne.
- Les erreurs sont claires.
- Une notification est envoyée.
- Un message de confirmation apparaît.
- L'expérience mobile est fluide.

---

## Phase 7 — SEO, analytics et pages système

### Objectif

Préparer le lancement proprement.

### Tâches

- Ajouter metadata pour toutes les pages.
- Ajouter Open Graph.
- Ajouter sitemap.
- Ajouter robots.txt.
- Ajouter favicon.
- Ajouter image de partage.
- Installer analytics.
- Ajouter tracking événements principaux.
- Créer page `/merci`.
- Créer politique de confidentialité simple si nécessaire.

### Événements à suivre

- clic WhatsApp ;
- soumission demande ;
- clic pack ;
- vue produit ;
- clic CTA principal.

### Critères d'acceptation

- Les pages ont des titres et descriptions propres.
- Analytics fonctionne.
- Les événements importants sont traçables.

---

## Phase 8 — Tests et QA

### Objectif

S'assurer que la V1 est fiable avant livraison.

### Checklist

- Tester navigation desktop.
- Tester navigation mobile.
- Tester tous les liens.
- Tester tous les CTA.
- Tester formulaire contact.
- Tester formulaire demande personnalisée.
- Tester WhatsApp sur mobile.
- Tester responsive sur plusieurs tailles.
- Vérifier les erreurs console.
- Vérifier performance images.
- Vérifier SEO de base.
- Vérifier accessibilité de base.

### Critères d'acceptation

- Aucune erreur bloquante.
- Expérience mobile propre.
- Formulaires fonctionnels.
- Site prêt à être montré à un client.

---

## Phase 9 — Déploiement

### Objectif

Mettre le site en ligne.

### Tâches

- Configurer variables d'environnement.
- Déployer sur Vercel ou autre hébergeur.
- Connecter domaine `preparemadot.com`.
- Tester production.
- Vérifier HTTPS.
- Vérifier formulaire en production.
- Vérifier analytics.
- Vérifier sitemap.

### Livrable final

- Site V1 en ligne.
- Documentation courte de gestion.
- Accès transmis au client.

---

## Priorités MoSCoW

### Must have

- Accueil
- Comment ça marche
- Boutique
- Fiches produits
- Packs
- Demande personnalisée
- Contact
- WhatsApp
- Responsive mobile
- SEO de base
- Analytics

### Should have

- Upload document
- Page merci
- Filtres produits
- Notifications email propres
- Données stockées en base

### Could have

- FAQ
- Blog
- Galerie avancée
- Multilingue anglais
- Paiement en ligne simple

### Won't have en V1

- Marketplace
- Espace client
- Espace partenaire
- App mobile
- Devis automatique
- IA/chatbot
- Logistique avancée

---

## Ordre de travail recommandé

1. Initialiser le projet.
2. Construire layout + design system.
3. Construire homepage.
4. Construire pages contenu.
5. Construire boutique.
6. Construire packs.
7. Construire formulaire demande.
8. Ajouter backend formulaire.
9. Ajouter SEO/analytics.
10. Tester.
11. Déployer.

---

## Risques à éviter

- Trop complexifier la V1.
- Passer trop de temps sur le paiement.
- Ajouter un espace client trop tôt.
- Créer une architecture CMS lourde sans nécessité.
- Lancer avec un rendu visuel générique.
- Négliger le mobile.
- Négliger le formulaire de demande.
- Mettre trop peu de CTA WhatsApp.

---

## Définition de succès

La V1 est réussie si Prepare Ma Dot peut immédiatement :

- présenter son activité ;
- recevoir des demandes qualifiées ;
- montrer ses produits ;
- vendre ou pré-vendre ses packs ;
- échanger avec les prospects sur WhatsApp ;
- commencer à apprendre des besoins réels du marché.
