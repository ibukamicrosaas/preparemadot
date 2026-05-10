# Guide de Sécurité SaaS — Règles Absolues

> Ce document est destiné à tout développeur ou agent IA travaillant sur un projet SaaS.
> Chaque règle est accompagnée du problème qu'elle résout, d'un exemple mauvais et d'un exemple correct.
> Appliquer ce guide AVANT d'écrire du code, pas après.

---

## Table des matières

1. [Ne jamais faire confiance au client](#1-ne-jamais-faire-confiance-au-client)
2. [Authentification](#2-authentification)
3. [Autorisation et contrôle d'accès](#3-autorisation-et-contrôle-daccès)
4. [Validation des entrées](#4-validation-des-entrées)
5. [Paiements et données financières](#5-paiements-et-données-financières)
6. [Cryptographie et secrets](#6-cryptographie-et-secrets)
7. [Rate limiting et protection brute-force](#7-rate-limiting-et-protection-brute-force)
8. [Base de données et RLS](#8-base-de-données-et-rls)
9. [Webhooks](#9-webhooks)
10. [Exposition d'informations](#10-exposition-dinformations)
11. [Gestion des sessions](#11-gestion-des-sessions)
12. [Infrastructure et déploiement](#12-infrastructure-et-déploiement)
13. [XSS et Content Security Policy](#13-xss-et-content-security-policy)
14. [Open Redirect](#14-open-redirect)
15. [Mass Assignment](#15-mass-assignment)
16. [Upload de fichiers](#16-upload-de-fichiers)
17. [SSRF — Server-Side Request Forgery](#17-ssrf--server-side-request-forgery)
18. [Monitoring et détection d'intrusion](#18-monitoring-et-détection-dintrusion)
19. [Checklist avant mise en production](#19-checklist-avant-mise-en-production)

---

## 1. Ne jamais faire confiance au client

**Principe fondateur :** Tout ce qui vient du navigateur peut être falsifié. Prix, IDs, rôles, montants — tout.

### ❌ Mauvais

```typescript
// Le client envoie le prix dans le body — un attaquant envoie price: 1
const { productId, price } = await req.json()
await db.orders.insert({ productId, price })
```

```typescript
// Le client envoie son propre rôle
const { userId, role } = await req.json()
if (role === 'admin') { /* ... */ }
```

### ✅ Correct

```typescript
// Le prix est toujours lu depuis la base de données
const { productId } = await req.json()
const product = await db.products.findById(productId)
await db.orders.insert({ productId, price: product.price })
```

```typescript
// Le rôle est toujours lu depuis la DB ou le token de session
const session = await getSession(req)
const user = await db.profiles.findById(session.userId)
if (user.role === 'admin') { /* ... */ }
```

### Règles

- **Tous les montants financiers** sont calculés côté serveur depuis la DB
- **Tous les IDs** sont revalidés côté serveur (appartiennent-ils à l'utilisateur ?)
- **Tous les rôles et permissions** viennent de la session ou de la DB, jamais du body
- **Toutes les variantes de prix** (options, formules) sont vérifiées contre la DB

---

## 2. Authentification

### 2.1 Force des mots de passe et PINs

| Type | Minimum | Recommandé |
|---|---|---|
| Mot de passe | 8 caractères | 12 caractères + complexité |
| PIN numérique | 6 chiffres | 8 chiffres |
| Token de reset | 128 bits (hex 32 chars) | idem |
| Token de session client | UUID v4 (122 bits) | `crypto.randomBytes(32).toString('hex')` |

### ❌ Mauvais

```typescript
// PIN 6 chiffres sans rate limiting = brute-forceable en quelques minutes
const token = String(Math.floor(100000 + Math.random() * 900000))

// Identifiant prévisible à partir du numéro de téléphone
const email = `${phone}@monapp.com`  // révèle le schéma
```

### ✅ Correct

```typescript
import crypto from 'crypto'

// Token de reset avec entropie suffisante pour les usages programmatiques
const resetToken = crypto.randomBytes(16).toString('hex')  // 128 bits

// Pour les codes entrés manuellement (UX), compenser avec du rate limiting strict
const pinCode = String(Math.floor(100000 + Math.random() * 900000))
// + max 5 tentatives avant invalidation du code
```

### 2.2 Ne pas révéler l'existence des comptes

```typescript
// ❌ Révèle si le compte existe
if (!user) return { error: 'Aucun compte trouvé avec ce numéro.' }

// ✅ Réponse identique que le compte existe ou non
return { success: true }  // "Si un compte existe, vous recevrez un email/SMS"
```

### 2.3 Génération de tokens cryptographiquement sûre

```typescript
// ❌ Math.random() n'est pas cryptographiquement sûr
const token = Math.random().toString(36)

// ✅ crypto.randomBytes / randomUUID pour tout ce qui touche à la sécurité
import crypto from 'crypto'
const token = crypto.randomUUID()          // session clients
const secret = crypto.randomBytes(32).toString('hex')  // secrets webhook
```

---

## 3. Autorisation et contrôle d'accès

### 3.1 Vérifier l'appartenance des ressources (IDOR)

L'**Insecure Direct Object Reference** est la faille la plus courante dans les SaaS multi-tenant. Toujours vérifier que la ressource demandée appartient à l'utilisateur qui la demande.

### ❌ Mauvais

```typescript
// Tout le monde peut voir n'importe quelle réservation avec son UUID
const booking = await db.bookings.findById(params.id)
return NextResponse.json({ booking })

// Token optionnel — si absent, accès accordé quand même
if (token && booking.client_token !== token) {
  return NextResponse.json({ error: 'Token invalide' }, { status: 403 })
}
```

### ✅ Correct

```typescript
// Token obligatoire — sans token valide, aucune donnée
if (!token || booking.client_token !== token) {
  return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
}

// Pour les routes admin, toujours filtrer par l'ID du salon de l'utilisateur
const session = await getSession(req)
const booking = await db.bookings.findOne({
  where: { id: params.id, salon_id: session.salon_id }  // filtre propriétaire
})
if (!booking) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
```

### 3.2 Valider les relations entre entités

```typescript
// ❌ staffId envoyé par le client n'est jamais vérifié
const { staffId } = await req.json()
await db.bookings.insert({ staffId, salonId })

// ✅ Vérifier que staffId appartient bien au salon de la réservation
const staff = await db.staff.findOne({
  where: { id: staffId, salon_id: salonId, is_active: true }
})
if (!staff) return { error: 'Prestataire invalide' }
```

### 3.3 Protéger toutes les routes sensibles au niveau middleware

Ne pas compter uniquement sur les vérifications dans chaque handler — un handler oublié crée une vulnérabilité. Le middleware garantit une protection systématique.

```typescript
// middleware.ts — protéger par catégorie de route
export const config = {
  matcher: [
    '/dashboard/:path*',   // authentification obligatoire
    '/admin/:path*',       // authentification + rôle admin
    '/api/admin/:path*',   // authentification + rôle admin (API)
    '/api/cron/:path*',    // secret cron obligatoire
  ],
}
```

### 3.4 Séparation des privilèges — client service_role

```typescript
// ❌ Utiliser le client admin partout (bypass RLS pour tout)
const admin = createAdminClient()
const { data } = await admin.from('bookings').select('*')

// ✅ Client admin uniquement pour les opérations légitimes qui nécessitent bypass RLS
// - Webhooks de paiement
// - Cron jobs
// - Opérations admin explicitement autorisées

// Pour tout le reste : client normal (respecte RLS)
const supabase = await createServerClient()
const { data } = await supabase.from('bookings').select('*')
```

---

## 4. Validation des entrées

### Principe : valider côté serveur TOUJOURS, côté client en bonus

La validation côté client (formulaire, TypeScript) est de l'UX, pas de la sécurité. Un attaquant peut contourner n'importe quelle validation frontend.

### 4.1 Format et type

```typescript
// ❌ Passer date et time directement en DB sans validation
const { date, time } = await req.json()
await db.bookings.insert({ date, time })

// ✅ Valider le format avant tout
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const TIME_REGEX = /^\d{2}:\d{2}$/

if (!DATE_REGEX.test(date)) return { error: 'Format date invalide' }
if (!TIME_REGEX.test(time)) return { error: 'Format heure invalide' }
```

### 4.2 Limites de taille

```typescript
// Toujours définir des limites sur les champs texte
const MAX_LENGTHS = {
  name:        100,
  description: 500,
  notes:       1000,
  phone:       20,
}

for (const [field, max] of Object.entries(MAX_LENGTHS)) {
  if (body[field]?.length > max) {
    return { error: `${field} trop long (max ${max} caractères)` }
  }
}
```

### 4.3 Valeurs énumérées

```typescript
// ❌ Accepter n'importe quelle valeur de méthode
const { method } = await req.json()
await payout(method)

// ✅ Whitelist explicite
const VALID_METHODS = ['wave', 'orange_money'] as const
if (!VALID_METHODS.includes(method)) {
  return { error: 'Méthode invalide' }
}
```

### 4.4 IDs — format UUID

```typescript
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isValidUUID(id: string): boolean {
  return UUID_REGEX.test(id)
}

if (!isValidUUID(bookingId)) {
  return NextResponse.json({ error: 'ID invalide' }, { status: 400 })
}
```

---

## 5. Paiements et données financières

Ces règles s'appliquent quel que soit l'agrégateur (Bictorys, Stripe, PayPal, etc.).

### Règle 1 — Ne jamais confirmer un paiement sur la redirection de retour

```typescript
// ❌ La successRedirectUrl n'est pas une preuve de paiement
// Un utilisateur peut naviguer vers cette URL sans avoir payé
app.get('/success', async (req) => {
  await confirmBooking(req.query.booking_id)  // FAUX
})

// ✅ Seul le webhook est une source de vérité
app.post('/webhooks/payment', async (req) => {
  // Vérifier signature → mettre à jour statut → confirmer booking
})
```

### Règle 2 — Calculer les montants côté serveur

```typescript
// ❌ Le client envoie le montant à payer
const { amount } = await req.json()
await createPaymentCharge(amount)

// ✅ Le serveur calcule le montant depuis la DB
const booking = await db.bookings.findById(bookingId)
const amount = booking.deposit_amount > 0 ? booking.deposit_amount : booking.total_price
await createPaymentCharge(amount)
```

### Règle 3 — Vérifier le solde disponible avant un reversement

```typescript
// ❌ Accepter le montant demandé sans vérification
const { amount } = await req.json()
await payout(amount)

// ✅ Calculer le solde réel, rejeter si insuffisant
const totalCollected = await db.payments.sum('amount', { status: 'completed', salon_id })
const totalPaidOut   = await db.payouts.sum('gross_amount', { status: ['pending','completed'], salon_id })
const available = totalCollected - totalPaidOut

if (requestedAmount > available) {
  return { error: `Solde insuffisant. Disponible : ${available}` }
}
```

### Règle 4 — Idempotence sur tous les webhooks de paiement

```typescript
// Avant tout traitement, vérifier si déjà traité
const existing = await db.payments.findOne({ booking_id: bookingId })
if (existing?.status === 'completed') {
  return res.status(200).json({ ok: true, skipped: true })
}
// Traiter seulement si pas encore fait
```

### Règle 5 — Idempotence sur les reversements

```typescript
// Pour les virements automatiques (ex: Bictorys Payout API)
// Utiliser un idempotency-key = l'UUID du payout en base
await fetch('/payouts', {
  headers: { 'idempotency-key': payout.id },  // UUID unique par opération
  body: JSON.stringify({ amount: payout.net_amount })
})
// Si la même clé est renvoyée, l'API ne crée pas un second virement
```

### Règle 6 — Race condition sur les opérations financières (TOCTOU)

**Faille :** vérifier le solde puis insérer en deux étapes séparées laisse une fenêtre où deux requêtes concurrentes passent toutes les deux la vérification avant que l'une n'ait inséré.

```
Requête A : lit solde = 5820 ✓  →  ...  →  INSERT payout A  →  appel Bictorys A
Requête B : lit solde = 5820 ✓  →  INSERT payout B  →  appel Bictorys B
                                    ↑ fenêtre de vulnérabilité
```

L'idempotency-key ne protège **pas** dans ce cas : les deux payouts ont des UUID différents, donc Bictorys les traite comme deux virements distincts.

**Fix — index unique partiel en base :**

```sql
-- Un seul payout actif (pending ou processing) par salon à la fois.
-- La contrainte est levée automatiquement quand le status passe à
-- 'completed' ou 'failed', permettant un nouveau retrait.
CREATE UNIQUE INDEX payouts_one_active_per_salon
  ON payouts (salon_id)
  WHERE status IN ('pending', 'processing');
```

```typescript
// La seconde insertion concurrente échoue atomiquement avec code 23505.
// Intercepter explicitement pour renvoyer un message clair.
const { data, error } = await supabase.from('payouts').insert({ ... })
if (error?.code === '23505') {
  return res.status(409).json({ error: 'Un retrait est déjà en cours.' })
}
```

**Règle générale :** pour toute opération financière (payout, remboursement, crédit), rendre l'insertion elle-même atomiquement exclusive via une contrainte DB — ne pas compter sur la vérification applicative seule.

---

## 6. Cryptographie et secrets

### 6.1 Comparaison de secrets — toujours constant-time

La comparaison `===` s'arrête au premier caractère différent. Un attaquant peut extraire un secret caractère par caractère en mesurant le temps de réponse.

```typescript
// ❌ Vulnérable aux timing attacks
if (headerSecret === process.env.WEBHOOK_SECRET) { ... }

// ✅ Comparaison constant-time
import crypto from 'crypto'

function timingSafeEqual(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a)
    const bufB = Buffer.from(b)
    if (bufA.length !== bufB.length) return false
    return crypto.timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

if (timingSafeEqual(headerSecret, process.env.WEBHOOK_SECRET ?? '')) { ... }
```

**S'applique à :** secrets webhook, clés API entrantes, tokens de session, CRON_SECRET.

### 6.2 Ne jamais stocker des secrets en clair si évitable

```typescript
// Pour les clés API de tiers stockées en DB
// Option A : chiffrement applicatif (AES-256-GCM)
// Option B : colonne chiffrée avec pgcrypto (Supabase/Postgres)
// Option C : secrets vault (HashiCorp Vault, AWS Secrets Manager)

// À minima : ne jamais les logger
console.log('Clé API:', apiKey)  // ❌ JAMAIS
console.log('Clé API: [REDACTED]')  // ✅
```

### 6.3 Variables d'environnement — règles

```env
# Jamais de secrets dans le code source
# Jamais de .env dans git (vérifier .gitignore)

# Préfixes Next.js :
# NEXT_PUBLIC_* → exposé au navigateur (anon key, URL publique uniquement)
# Sans préfixe   → côté serveur uniquement (service_role, clés API, secrets)
```

```typescript
// Valider la présence des secrets au démarrage
const requiredEnvVars = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'WEBHOOK_SECRET',
  'CRON_SECRET',
]

for (const key of requiredEnvVars) {
  if (!process.env[key]) throw new Error(`Variable d'environnement manquante : ${key}`)
}
```

---

## 7. Rate limiting et protection brute-force

### Principe : toute action répétable sans coût doit être limitée

| Endpoint | Limite recommandée | Fenêtre |
|---|---|---|
| Login | 10 tentatives échouées | 15 min |
| Reset de mot de passe (demande) | 3 demandes | 1 heure |
| Reset de mot de passe (confirmation) | 5 tentatives | 15 min |
| Création de compte | 5 créations | 1 heure par IP |
| Endpoints publics (réservations) | 20 requêtes | 1 minute |
| Endpoints publics (disponibilités) | 60 requêtes | 1 minute |

### Implémentation — table DB (sans dépendance externe)

```sql
CREATE TABLE login_attempts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier    TEXT NOT NULL,        -- email, phone_email, IP
  attempt_type  TEXT NOT NULL,        -- 'login', 'pin_reset', 'signup'
  success       BOOLEAN NOT NULL DEFAULT false,
  attempted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON login_attempts (identifier, attempted_at DESC);
```

```typescript
async function isRateLimited(identifier: string, type: string, maxAttempts: number, windowMs: number): Promise<boolean> {
  const windowStart = new Date(Date.now() - windowMs).toISOString()
  const { count } = await adminDb
    .from('login_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('identifier', identifier)
    .eq('attempt_type', type)
    .eq('success', false)
    .gte('attempted_at', windowStart)
  return (count ?? 0) >= maxAttempts
}
```

### Implémentation — Upstash Redis (recommandé en production)

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '15 m'),
})

const { success } = await ratelimit.limit(identifier)
if (!success) return { error: 'Trop de tentatives. Réessayez dans 15 minutes.' }
```

### Réponse aux tentatives bloquées

```typescript
// ❌ Indiquer le temps restant exact (aide l'attaquant à synchroniser)
return { error: 'Compte bloqué pour encore 847 secondes.' }

// ✅ Message générique
return { error: 'Trop de tentatives. Réessayez dans 15 minutes.' }
```

---

## 8. Base de données et RLS

### Règle 1 — RLS activé sur TOUTES les tables, sans exception

```sql
-- Activer sur chaque nouvelle table immédiatement après CREATE TABLE
ALTER TABLE ma_nouvelle_table ENABLE ROW LEVEL SECURITY;

-- Sans policy explicite, RLS bloque tout accès → behavior sûr par défaut
-- Ajouter les policies nécessaires explicitement
```

### Règle 2 — Policies restrictives par défaut

```sql
-- ❌ Policy trop permissive
CREATE POLICY "public_read" ON bookings FOR SELECT USING (true);

-- ✅ Lecture publique uniquement sur les champs nécessaires, filtrée
CREATE POLICY "client_read_own" ON bookings
  FOR SELECT USING (client_token = current_setting('app.client_token', true));

-- ✅ Owner voit uniquement son salon
CREATE POLICY "owner_access" ON bookings
  FOR ALL USING (
    salon_id IN (SELECT salon_id FROM profiles WHERE id = auth.uid() AND role = 'owner')
  );
```

### Règle 3 — Fonctions SECURITY DEFINER — utiliser avec parcimonie

```sql
-- SECURITY DEFINER exécute la fonction avec les droits du créateur (superuser)
-- Utiliser uniquement pour les helpers RLS qui ont besoin d'accès élevé
-- Toujours ajouter STABLE ou IMMUTABLE pour limiter les side effects

CREATE OR REPLACE FUNCTION get_my_salon_id()
RETURNS UUID AS $$
  SELECT salon_id FROM profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;
```

### Règle 4 — Pas de SQL dynamique dans les RPC

```sql
-- ❌ SQL dynamique avec interpolation de chaînes = injection SQL
CREATE FUNCTION search_bookings(search_term TEXT) RETURNS SETOF bookings AS $$
BEGIN
  RETURN QUERY EXECUTE 'SELECT * FROM bookings WHERE notes LIKE ''%' || search_term || '%''';
END;
$$ LANGUAGE plpgsql;

-- ✅ Requêtes paramétrées
CREATE FUNCTION search_bookings(search_term TEXT) RETURNS SETOF bookings AS $$
  SELECT * FROM bookings WHERE notes ILIKE '%' || search_term || '%';
$$ LANGUAGE sql STABLE;
```

### Règle 5 — Migrations : toujours inclure RLS

```sql
-- Template pour chaque nouvelle migration créant une table
CREATE TABLE IF NOT EXISTS nouvelle_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id UUID NOT NULL REFERENCES salons(id) ON DELETE CASCADE,
  -- autres colonnes
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE nouvelle_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_full_access" ON nouvelle_table
  FOR ALL USING (salon_id = get_my_salon_id());
```

---

## 9. Webhooks

Les webhooks reçoivent des données de systèmes externes — ils sont une surface d'attaque critique.

### Règle 1 — Toujours valider la signature avant tout traitement

```typescript
export async function POST(req: NextRequest) {
  const rawBody = await req.text()  // Lire en text pour la vérification de signature
  const signature = req.headers.get('x-signature') ?? ''

  // Valider AVANT de parser ou de traiter quoi que ce soit
  if (!timingSafeEqual(signature, process.env.WEBHOOK_SECRET ?? '')) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const payload = JSON.parse(rawBody)
  // Traiter seulement ici
}
```

### Règle 2 — Retourner 200 même en cas d'erreur interne

```typescript
// Si on retourne 4xx/5xx, le fournisseur retentera → risque de double traitement
try {
  await processWebhook(payload)
  return NextResponse.json({ ok: true })
} catch (err) {
  console.error('[webhook]', err)
  // Logger l'erreur mais retourner 200 pour stopper les retries
  return NextResponse.json({ ok: true, error: 'processing_failed' })
}
```

### Règle 3 — Idempotence obligatoire

```typescript
// Toujours vérifier si l'event a déjà été traité
const existing = await db.events.findOne({ provider_event_id: payload.id })
if (existing) return NextResponse.json({ ok: true, skipped: true })

// Marquer immédiatement comme "en cours" avant le traitement
await db.events.insert({ provider_event_id: payload.id, status: 'processing' })
```

### Règle 4 — Multi-tenant : valider le secret du bon tenant

```typescript
// En multi-tenant, chaque salon peut avoir son propre webhook secret
// Il faut d'abord identifier le tenant, puis valider avec son secret

const bookingId = payload.merchantReference  // identifier le tenant via l'event
const salon = await getSalonByBooking(bookingId)
const expectedSecret = salon?.webhook_secret ?? process.env.PLATFORM_WEBHOOK_SECRET ?? ''

if (!timingSafeEqual(headerSecret, expectedSecret)) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
}
```

---

## 10. Exposition d'informations

### Règle 1 — Messages d'erreur génériques côté client

```typescript
// ❌ Révèle des détails d'implémentation
return { error: 'Column "deposit_amount" violates not-null constraint' }
return { error: 'JWT expired at 2026-01-01T00:00:00Z' }
return { error: 'User with email 221771234567@beautydesk.app not found' }

// ✅ Messages génériques
return { error: 'Réservation introuvable.' }
return { error: 'Session expirée. Reconnectez-vous.' }
return { error: 'Numéro ou code PIN incorrect.' }

// Les détails techniques vont dans les logs serveur uniquement
console.error('[signIn] Supabase error:', error.message)
```

### Règle 2 — Ne pas logguer de données sensibles

```typescript
// ❌ Clés et données personnelles dans les logs
console.log('API key:', apiKey)
console.log('User data:', { name, phone, pin })

// ✅ Logguer uniquement les identifiants non sensibles
console.log('[createCharge] salon_id:', salonId, 'amount:', amount)
console.error('[createCharge] error:', error.message)
```

### Règle 3 — Champs masqués dans les réponses API

```typescript
// ❌ Retourner tous les champs du salon, y compris les clés API
const salon = await db.salons.findById(id)
return NextResponse.json({ salon })

// ✅ Sélectionner uniquement les champs nécessaires
const salon = await db.salons.findById(id, {
  select: ['id', 'name', 'city', 'description', 'primary_color', 'logo_url']
  // Exclure : bictorys_secret_key, payout_wave_number, plan, etc.
})
```

### Règle 4 — Headers de sécurité HTTP

```typescript
// next.config.ts
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]
```

---

## 11. Gestion des sessions

### Règle 1 — Cookies sécurisés

```typescript
// Configuration des cookies de session
cookieOptions: {
  httpOnly: true,          // Inaccessible depuis JavaScript
  secure: process.env.NODE_ENV === 'production',  // HTTPS uniquement en prod
  sameSite: 'lax',         // Protection CSRF basique
  maxAge: 60 * 60 * 24 * 365,  // 1 an (ajuster selon le besoin)
  path: '/',
}
```

### Règle 2 — Tokens dans les URLs — les traiter comme éphémères

Les tokens dans les URLs (liens client, liens de reset) apparaissent dans :
- Les access logs du serveur
- L'historique du navigateur
- Les headers `Referer` des requêtes sortantes
- Les outils d'analytics

```typescript
// ✅ Atténuation : expiration courte + usage unique
const clientToken = crypto.randomUUID()
// Ce token expire avec la réservation, pas un token de long terme

// ✅ Pour les tokens de reset : usage unique, expiration 15 min
await db.pin_resets.update({ used: true }).eq('id', resetData.id)
```

### Règle 3 — Invalider les sessions à la déconnexion

```typescript
// ❌ Déconnexion purement client (localStorage)
localStorage.removeItem('token')

// ✅ Invalider côté serveur
await supabase.auth.signOut()  // révoque la session en DB
// Supprimer les cookies
```

### Règle 4 — Singleton pour le client navigateur (Supabase SSR)

```typescript
// ❌ Recréer le client à chaque render — perd les listeners de session
const supabase = createBrowserClient(url, key)

// ✅ Singleton — conserve l'auto-refresh du token
let client: SupabaseClient | null = null
export function getSupabaseClient() {
  if (!client) client = createBrowserClient(url, key, { /* cookieOptions */ })
  return client
}
```

---

## 12. Infrastructure et déploiement

### Règle 1 — Principe du moindre privilège

| Contexte | Client à utiliser |
|---|---|
| Server Components (lecture données utilisateur) | `createServerClient()` — respecte RLS |
| Server Actions (mutations utilisateur) | `createServerClient()` — respecte RLS |
| Webhooks de paiement | `createAdminClient()` — bypass RLS justifié |
| Cron jobs | `createAdminClient()` — bypass RLS justifié |
| Côté navigateur | `createBrowserClient()` — anon key uniquement |

### Règle 2 — Cron jobs — authentification robuste

```typescript
// ❌ Secret comparé avec ===
if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) { ... }

// ✅ Constant-time + vérification que le secret est configuré
if (!process.env.CRON_SECRET || !timingSafeEqual(authHeader, `Bearer ${process.env.CRON_SECRET}`)) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### Règle 3 — Dépendances

```bash
# Auditer régulièrement les dépendances
npm audit

# Maintenir les dépendances à jour (patches de sécurité)
npm outdated

# Ne jamais installer des packages sans vérifier leur popularité et maintenance
# Préférer les packages officiel du framework (next/*, @supabase/*)
```

### Règle 4 — Variables d'environnement en production

```bash
# Ne jamais mettre de secrets dans les variables publiques Vercel/Netlify
# NEXT_PUBLIC_* = visible par tous les utilisateurs dans le bundle JS

# Vérification : inspecter le bundle produit pour détecter des fuites
grep -r "secret" .next/static/  # Ne doit rien retourner de sensible
```

### Règle 5 — Sauvegardes et chiffrement au repos

- Les backups de base de données doivent être chiffrés
- Les clés de chiffrement ne doivent pas être stockées au même endroit que les données
- Tester la restauration des backups régulièrement (un backup non testé n'existe pas)

---

## 13. XSS et Content Security Policy

Le **Cross-Site Scripting** permet à un attaquant d'injecter du code JavaScript dans tes pages. Dans un SaaS, ça signifie voler les sessions de tous tes utilisateurs ou exfiltrer leurs données.

### Règle 1 — Ne jamais injecter du HTML non échappé

```tsx
// ❌ dangerouslySetInnerHTML avec données utilisateur = XSS garanti
<div dangerouslySetInnerHTML={{ __html: user.bio }} />

// ✅ Laisser React échapper automatiquement
<div>{user.bio}</div>

// Si le HTML est vraiment nécessaire (rich text) : utiliser DOMPurify
import DOMPurify from 'isomorphic-dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(user.bio) }} />
```

### Règle 2 — Content Security Policy stricte

La CSP est la dernière ligne de défense — elle dit au navigateur quels scripts sont autorisés à s'exécuter.

```typescript
// next.config.ts
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'nonce-{NONCE}';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.supabase.co wss://realtime.supabase.co;
  frame-ancestors 'none';
`
// Ajouter en header : Content-Security-Policy: <valeur>
```

### Règle 3 — Stocker les données sensibles hors du localStorage

```typescript
// ❌ localStorage est accessible à tout script sur la page (XSS → vol de token)
localStorage.setItem('auth_token', token)

// ✅ Cookies httpOnly — inaccessibles depuis JavaScript même en cas de XSS
// Supabase SSR les gère automatiquement via @supabase/ssr
```

### Règle 4 — URLs construites depuis du contenu utilisateur

```typescript
// ❌ Un attaquant saisit : javascript:alert(document.cookie)
<a href={user.website}>Site</a>

// ✅ Valider que l'URL est http ou https
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch { return false }
}
<a href={isSafeUrl(user.website) ? user.website : '#'}>Site</a>
```

---

## 14. Open Redirect

Un Open Redirect permet à un attaquant d'utiliser **ton domaine de confiance** pour rediriger les utilisateurs vers un site malveillant. Très utilisé en phishing : `https://monapp.com/login?next=https://evil.com`

### ❌ Mauvais

```typescript
// Le paramètre ?next= n'est pas validé
const next = searchParams.get('next') ?? '/dashboard'
redirect(next)  // Un attaquant envoie next=https://evil.com
```

### ✅ Correct

```typescript
// Valider que la redirection est interne (chemin relatif uniquement)
function getSafeRedirect(next: string | null, fallback = '/dashboard'): string {
  if (!next) return fallback
  // Accepter uniquement les chemins relatifs commençant par /
  // Rejeter //, //evil.com, http://, etc.
  if (/^\/[^/\\]/.test(next) || next === '/') return next
  return fallback
}

const redirectTo = getSafeRedirect(searchParams.get('next'))
redirect(redirectTo)
```

### Cas fréquent : après le login

```typescript
// ❌ Rediriger vers n'importe quelle URL après authentification
const callbackUrl = req.nextUrl.searchParams.get('callbackUrl')
return NextResponse.redirect(callbackUrl)

// ✅ Forcer le même origin
const callbackUrl = req.nextUrl.searchParams.get('callbackUrl')
const url = new URL(callbackUrl ?? '/dashboard', req.nextUrl.origin)
// Si l'origin diffère → rejeter
if (url.origin !== req.nextUrl.origin) return NextResponse.redirect('/dashboard')
return NextResponse.redirect(url)
```

---

## 15. Mass Assignment

Le **Mass Assignment** se produit quand on mappe directement le body d'une requête sur un objet DB, permettant à l'attaquant de modifier des champs non prévus (rôle, plan, solde, etc.).

### ❌ Mauvais

```typescript
// L'attaquant envoie { name: "Salon", plan: "multi", role: "admin" }
const body = await req.json()
await db.salons.update({ id: salonId, ...body })  // met à jour TOUT
```

```typescript
// Même problème avec Supabase
const updates = await req.json()
await supabase.from('salons').update(updates).eq('id', salonId)
```

### ✅ Correct

```typescript
// Whitelist explicite des champs modifiables par l'utilisateur
const { name, description, primary_color, city } = await req.json()

await supabase.from('salons').update({
  name,           // ✅ modifiable
  description,    // ✅ modifiable
  primary_color,  // ✅ modifiable
  city,           // ✅ modifiable
  // plan, role, bictorys_secret_key, etc. → jamais mis à jour ici
}).eq('id', salonId)
```

### Règle : séparer les endpoints par niveau de privilège

```typescript
// PATCH /api/salons/:id         → champs visuels (nom, couleur, description)
// PATCH /api/admin/salons/:id   → champs sensibles (plan, clé API) — admin uniquement
// Ne jamais mélanger les deux dans un seul endpoint générique
```

---

## 16. Upload de fichiers

Les uploads sont une surface d'attaque majeure : injection de fichiers exécutables, DoS par fichiers volumineux, exfiltration via path traversal, XSS via SVG.

### Règle 1 — Valider le type MIME côté serveur, pas côté client

```typescript
// ❌ Le Content-Type envoyé par le client est falsifiable
const contentType = req.headers.get('content-type')
if (contentType !== 'image/jpeg') return error

// ✅ Lire les magic bytes du fichier (les premiers octets définissent le vrai type)
import fileType from 'file-type'  // ou 'magic-bytes'

const buffer = await file.arrayBuffer()
const type = await fileType.fromBuffer(buffer)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
if (!type || !ALLOWED_TYPES.includes(type.mime)) {
  return { error: 'Type de fichier non autorisé' }
}
```

### Règle 2 — Limites strictes de taille

```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024  // 5 MB

if (file.size > MAX_FILE_SIZE) {
  return { error: 'Fichier trop volumineux (max 5 Mo)' }
}
```

### Règle 3 — Renommer le fichier à l'upload

```typescript
// ❌ Conserver le nom original — risque de path traversal et d'écrasement
const filename = file.name  // "../../../../etc/cron.d/malicious"

// ✅ Générer un nom aléatoire côté serveur
import crypto from 'crypto'
const ext = '.jpg'  // extension issue de la validation MIME, pas du nom client
const filename = `${crypto.randomUUID()}${ext}`
```

### Règle 4 — Ne jamais servir les fichiers uploadés depuis le même domaine que l'app

```typescript
// ❌ Servir depuis /uploads/fichier.svg → un SVG peut contenir du JS → XSS
// app.use('/uploads', express.static('./uploads'))

// ✅ Stocker sur un sous-domaine ou CDN dédié (ex: storage.monapp.com)
// Supabase Storage avec bucket privé + URL signées temporaires
const { data } = await supabase.storage
  .from('salon-logos')
  .createSignedUrl(path, 3600)  // URL valable 1 heure
```

### Règle 5 — Buckets privés par défaut

```sql
-- Supabase : les buckets doivent être privés par défaut
-- Accès via URL signées avec expiration, jamais via URL publique permanente
-- Exception : assets vraiment publics (logo d'une page de réservation publique)
```

---

## 17. SSRF — Server-Side Request Forgery

Le **SSRF** se produit quand ton serveur fait des requêtes HTTP basées sur une URL fournie par l'utilisateur. L'attaquant peut ainsi accéder à des ressources internes (metadata AWS, autres services, base de données).

### ❌ Mauvais

```typescript
// L'utilisateur soumet une URL de webhook → ton serveur fait la requête
const { webhookUrl } = await req.json()
await fetch(webhookUrl, { method: 'POST', body: JSON.stringify(data) })
// Un attaquant soumet : http://169.254.169.254/latest/meta-data/ (metadata AWS)
// ou : http://localhost:5432/ (PostgreSQL interne)
```

### ✅ Correct

```typescript
function isAllowedWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    // HTTPS obligatoire
    if (parsed.protocol !== 'https:') return false
    // Bloquer les IPs privées et localhost
    const hostname = parsed.hostname
    const BLOCKED = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2\d|3[01])\./,
      /^192\.168\./,
      /^169\.254\./,  // link-local (metadata cloud)
      /^::1$/,        // IPv6 localhost
      /^fc00:/i,      // IPv6 privé
    ]
    if (BLOCKED.some(re => re.test(hostname))) return false
    return true
  } catch { return false }
}

if (!isAllowedWebhookUrl(webhookUrl)) {
  return { error: 'URL non autorisée' }
}
```

### Contextes à risque

- URLs de webhook configurées par l'utilisateur
- Import de données depuis une URL (CSV, image, RSS)
- Génération de PDF/screenshot depuis une URL fournie
- Proxy de requêtes vers des APIs tierces

### Protection supplémentaire : résolution DNS

```typescript
// La validation de l'URL ne suffit pas si le domaine résout vers une IP privée
// (DNS rebinding attack). Utiliser un resolver DNS externe ou une allowlist de domaines.
import { Resolver } from 'dns/promises'
const resolver = new Resolver()
resolver.setServers(['8.8.8.8'])  // forcer DNS externe

const addresses = await resolver.resolve4(hostname)
// Vérifier que chaque adresse IP n'est pas dans une plage privée
```

---

## 18. Monitoring et détection d'intrusion

Un produit sécurisé n'est pas seulement un produit qui résiste aux attaques — c'est un produit qui **détecte** quand il est attaqué et permet de réagir vite.

### Règle 1 — Logger les événements de sécurité structurés

```typescript
// ✅ Logger avec contexte suffisant pour l'investigation
console.error(JSON.stringify({
  level: 'security',
  event: 'login_failed',
  phone_hash: hashPhoneForLogs(phone),  // jamais le téléphone en clair
  ip: req.headers.get('x-forwarded-for'),
  user_agent: req.headers.get('user-agent'),
  timestamp: new Date().toISOString(),
}))

// Événements à logger systématiquement :
// - Échecs d'authentification (login, reset PIN)
// - Tentatives d'accès à des ressources non autorisées (403)
// - Rate limiting déclenché
// - Signature webhook invalide reçue
// - Erreur interne sur une opération financière (500)
// - Changement de plan ou de clé API
```

### Règle 2 — Seuils d'alerte

```typescript
// Exemples de seuils qui doivent déclencher une alerte immédiate

// > 50 échecs de login en 5 minutes sur un même compte → attaque ciblée
// > 200 erreurs 401/403 en 1 minute → scan automatisé
// > 3 erreurs 500 sur une route de paiement → bug en production
// > 1 signature webhook invalide → tentative d'injection de faux événements
// Pic soudain du nombre de comptes créés → création de comptes en masse
```

### Règle 3 — Hacher les données personnelles dans les logs

```typescript
// ❌ RGPD + confidentialité : les logs ne doivent pas contenir de données personnelles
console.log('Login failed for:', phone)  // "+221771234567" dans les logs

// ✅ Hacher de façon déterministe pour pouvoir corréler sans exposer
import crypto from 'crypto'
function hashForLogs(value: string): string {
  return crypto.createHmac('sha256', process.env.LOG_HMAC_SECRET ?? 'dev')
    .update(value).digest('hex').slice(0, 12)  // 12 chars suffisent pour corréler
}
console.log('Login failed for:', hashForLogs(phone))  // "a3f7c91d2e8b"
```

### Règle 4 — Séparation des logs par niveau de criticité

| Niveau | Quand | Action |
|--------|-------|--------|
| `info` | Opérations normales (login ok, paiement ok) | Rotation après 30j |
| `warn` | Anomalies non bloquantes (rate limit proche, retry) | Alerte hebdo |
| `error` | Opérations échouées (500, webhook invalid) | Alerte immédiate |
| `security` | Événements de sécurité (auth failed, 403, scan) | Alerte immédiate + conservation 90j |

### Règle 5 — Plan de réponse à incident (à définir AVANT un incident)

Documenter pour chaque projet :

```markdown
## Plan de réponse
1. **Détection** : qui reçoit les alertes ? (email, Slack, SMS)
2. **Isolation** : comment couper l'accès à un compte compromis ?
   - Supabase : Admin > Users > Disable user
   - Invalider toutes les sessions actives
3. **Analyse** : quels logs consulter en premier ? (Supabase Logs, Vercel Logs)
4. **Correction** : comment déployer un fix en urgence ?
5. **Communication** : RGPD impose de notifier les utilisateurs affectés sous 72h
```

---

## 19. Checklist avant mise en production

### Authentification & Sessions
- [ ] Rate limiting sur le login (max N tentatives / fenêtre de temps)
- [ ] Rate limiting sur le reset de mot de passe (demande + confirmation)
- [ ] Cookies : `httpOnly`, `secure`, `sameSite` configurés
- [ ] Tokens générés avec `crypto.randomBytes` ou `crypto.randomUUID`
- [ ] Messages d'erreur génériques (pas de révélation d'existence de compte)
- [ ] Sessions invalidées côté serveur à la déconnexion

### Autorisation
- [ ] Chaque endpoint vérifie que la ressource appartient à l'utilisateur
- [ ] Tokens d'accès publics (liens client) obligatoires, pas optionnels
- [ ] Middleware protège toutes les routes sensibles (`/dashboard`, `/admin`, `/api/admin`)
- [ ] Relations entre entités validées (ex: staffId appartient au bon salon)
- [ ] Rôles lus depuis la DB, jamais depuis le body de la requête

### Données financières
- [ ] Montants calculés côté serveur depuis la DB
- [ ] Paiements confirmés uniquement via webhook, jamais via redirect
- [ ] Solde vérifié avant tout reversement
- [ ] Idempotence sur webhooks et payouts
- [ ] Index unique partiel sur les payouts actifs (protection race condition TOCTOU)
- [ ] Variantes de prix validées contre la DB

### Cryptographie
- [ ] Comparaison de secrets avec `crypto.timingSafeEqual` partout
- [ ] Pas de `Math.random()` pour des tokens de sécurité
- [ ] Secrets sensibles non loggués
- [ ] `.env` dans `.gitignore`

### Base de données
- [ ] RLS activé sur toutes les tables
- [ ] Policies restrictives (pas de `USING (true)` sur des données sensibles)
- [ ] Migrations testées en staging avant production

### Webhooks
- [ ] Signature validée avant tout traitement
- [ ] Idempotence implémentée
- [ ] Race condition financière couverte par contrainte DB (pas seulement vérification applicative)
- [ ] Retour HTTP 200 même en cas d'erreur interne
- [ ] Secrets webhook différents par tenant (si multi-tenant)

### Infrastructure
- [ ] `npm audit` sans vulnérabilités critiques
- [ ] Variables d'environnement vérifiées au démarrage
- [ ] Headers de sécurité HTTP configurés (`X-Frame-Options`, `X-Content-Type-Options`, etc.)
- [ ] Logs ne contiennent pas de données sensibles (téléphone, PIN, clé API)
- [ ] Backups configurés et testés

### XSS & CSP
- [ ] Aucun `dangerouslySetInnerHTML` avec données utilisateur non assainies
- [ ] Content Security Policy configurée en header HTTP
- [ ] URLs construites depuis du contenu utilisateur validées (protocol http/https uniquement)
- [ ] Données sensibles dans des cookies `httpOnly`, pas dans `localStorage`

### Open Redirect
- [ ] Paramètre `?next=` / `?redirect=` validé (chemins relatifs uniquement, même origin)
- [ ] Aucune redirection vers une URL fournie par l'utilisateur sans validation d'origin

### Mass Assignment
- [ ] Aucun spread d'un body non filtré dans un `.update()` ou `.insert()` DB
- [ ] Whitelist explicite des champs modifiables par l'utilisateur dans chaque endpoint
- [ ] Endpoints admin séparés des endpoints utilisateur pour les champs sensibles (plan, rôle, clé API)

### Upload de fichiers
- [ ] Type MIME validé via magic bytes, pas via extension ou Content-Type client
- [ ] Taille maximale appliquée côté serveur
- [ ] Nom de fichier régénéré aléatoirement côté serveur
- [ ] Fichiers uploadés servis depuis un bucket/domaine séparé de l'app
- [ ] Buckets de stockage privés par défaut, accès via URLs signées

### SSRF
- [ ] URLs fournies par l'utilisateur validées avant toute requête serveur
- [ ] IPs privées, localhost et link-local bloqués (169.254.x.x, 10.x.x.x, etc.)
- [ ] Protocole HTTPS imposé pour les webhooks utilisateur
- [ ] Résolution DNS vérifiée si le contexte est à haut risque

### Monitoring
- [ ] Événements de sécurité loggés (échecs auth, 403, rate limit, webhook invalide)
- [ ] Données personnelles hachées dans les logs (pas de téléphone/email en clair)
- [ ] Seuils d'alerte définis (N échecs/minute → notification)
- [ ] Plan de réponse à incident documenté (qui, quoi, comment, RGPD 72h)

---

## Références

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — Les 10 failles les plus courantes
- [OWASP API Security](https://owasp.org/www-project-api-security/) — Spécifique aux APIs REST
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Next.js Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
