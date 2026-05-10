# AI_RULES.md — Règles pour l'agent IA de code

## 1. Mission

Tu construis la V1 de Prepare Ma Dot.

Ta mission est de produire un site fonctionnel, élégant, maintenable et orienté conversion.

Tu dois respecter le PRD, l'architecture et le plan d'exécution.

---

## 2. Principe produit

Ne cherche pas à créer la plateforme finale.

Crée une première version qui permet de :

- présenter l'activité ;
- inspirer confiance ;
- montrer les produits ;
- présenter les packs ;
- recevoir des demandes personnalisées ;
- faciliter le contact WhatsApp ;
- lancer les activités rapidement.

---

## 3. Règle de simplicité

Si une fonctionnalité n'aide pas directement à lancer, vendre ou recevoir des demandes, reporte-la.

Ne développe pas de fonctionnalités avancées sans nécessité.

Exemples à reporter :

- espace client ;
- marketplace ;
- espace partenaire ;
- devis automatique ;
- IA/chatbot ;
- app mobile ;
- dashboard complexe ;
- logistique avancée.

---

## 4. Priorité mobile

Le site doit être pensé d'abord pour mobile.

Chaque page et chaque formulaire doivent être testés mentalement sur un smartphone.

Règles :

- CTA visibles ;
- textes courts ;
- boutons faciles à toucher ;
- formulaire simple ;
- images optimisées ;
- navigation claire.

---

## 5. Qualité visuelle

Le rendu doit être premium, chaleureux et culturellement ancré.

Évite :

- design générique SaaS ;
- rendu froid ;
- surcharge visuelle ;
- trop d'icônes inutiles ;
- images au style IA trop évident ;
- couleurs criardes.

Utilise :

- bordeaux ;
- or doux ;
- beige ;
- ivoire ;
- typographie élégante ;
- grands espaces ;
- hiérarchie claire.

---

## 6. Ton du contenu

Le contenu doit être :

- simple ;
- humain ;
- respectueux ;
- rassurant ;
- premium ;
- non agressif.

Ne pas utiliser de jargon technique.

Ne pas écrire comme une publicité trop dure.

La dot est un sujet culturel et familial important : traite-le avec respect.

---

## 7. Code

Règles de code :

- TypeScript strict autant que possible ;
- composants petits et réutilisables ;
- noms de fichiers clairs ;
- logique séparée de l'UI ;
- données mockées centralisées ;
- configuration centralisée ;
- pas de duplication inutile ;
- pas de hardcoding répété ;
- pas de secrets dans le code.

---

## 8. Structure

Respecte autant que possible l'arborescence proposée dans `ARCHITECTURE.md`.

Centralise :

- données produits dans `data/products.ts` ;
- catégories dans `data/categories.ts` ;
- packs dans `data/packs.ts` ;
- configuration site dans `data/site.ts` ;
- helpers WhatsApp dans `lib/whatsapp.ts` ;
- validations dans `lib/validators.ts`.

---

## 9. Formulaires

Les formulaires doivent être fiables.

Règles :

- validation côté client ;
- validation côté serveur ;
- messages d'erreur clairs ;
- état de chargement ;
- état succès ;
- protection anti-spam si possible ;
- consentement contact ;
- notification email.

Ne jamais faire confiance uniquement au frontend.

---

## 10. WhatsApp

WhatsApp est un canal central.

Règles :

- bouton flottant visible ;
- CTA WhatsApp sur produits ;
- CTA WhatsApp sur packs ;
- message prérempli ;
- numéro configurable ;
- pas de répétition du numéro en dur.

---

## 11. SEO

Chaque page doit avoir une metadata propre.

Règles :

- un H1 par page ;
- title unique ;
- description claire ;
- URLs lisibles ;
- alt text sur images ;
- sitemap ;
- robots ;
- Open Graph.

---

## 12. Accessibilité

Respecte les bases :

- contraste suffisant ;
- labels de formulaire ;
- focus visible ;
- boutons descriptifs ;
- navigation mobile lisible ;
- pas de texte illisible sur image.

---

## 13. Performance

Règles :

- optimiser les images ;
- éviter les dépendances lourdes ;
- éviter les animations excessives ;
- utiliser le lazy loading ;
- ne pas bloquer le rendu avec des scripts externes ;
- garder le site rapide sur mobile.

---

## 14. Données fictives

Si les vrais produits ne sont pas encore fournis, crée des données mockées propres, réalistes et faciles à remplacer.

Ne pas inventer des prix définitifs si non confirmés.

Utiliser :

- “Sur devis” ;
- “Prix à confirmer” ;
- “Disponible sur demande”.

---

## 15. Paiement

Ne développe pas un système de paiement complet sauf instruction explicite.

La V1 peut fonctionner avec :

- demande via formulaire ;
- contact WhatsApp ;
- paiement manuel après échange.

Prépare simplement la structure pour intégrer un paiement plus tard.

---

## 16. Multilingue

La version française est prioritaire.

Prévoir une architecture qui pourra accueillir l'anglais plus tard, mais ne bloque pas la V1 sur le multilingue.

---

## 17. Erreurs et edge cases

Gérer :

- produit introuvable ;
- formulaire incomplet ;
- erreur serveur ;
- échec email ;
- mauvais fichier uploadé ;
- absence de produits ;
- absence d'image.

Créer des messages utilisateur simples.

---

## 18. Ne jamais faire

Ne jamais :

- exposer des clés API ;
- ignorer les validations serveur ;
- hardcoder des secrets ;
- créer une expérience uniquement desktop ;
- construire des fonctionnalités hors périmètre ;
- livrer un formulaire non testé ;
- utiliser du faux contenu trompeur ;
- dénaturer le positionnement culturel du projet.

---

## 19. Définition de qualité

Le site doit donner l'impression d'une marque sérieuse et premium, même si la V1 reste simple.

Un visiteur doit pouvoir comprendre :

- ce que fait Prepare Ma Dot ;
- pour qui le service existe ;
- comment ça marche ;
- quoi faire ensuite.

---

## 20. Objectif final

Le vrai succès de cette V1 n'est pas le nombre de fonctionnalités.

Le vrai succès est que Prepare Ma Dot puisse lancer son activité, recevoir ses premières demandes et apprendre des vrais clients.
