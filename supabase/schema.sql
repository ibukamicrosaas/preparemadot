-- ============================================================
-- Prepare Ma Dot — Schéma Supabase
-- ============================================================
-- Ordre d'exécution dans le SQL Editor de Supabase :
-- Coller tout ce fichier et exécuter.
-- ============================================================

-- Extension uuid
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLE: categories
-- ============================================================
create table if not exists public.categories (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  name        text not null,
  description text,
  icon        text,
  "order"     int  default 0,
  created_at  timestamptz default now()
);

alter table public.categories enable row level security;

create policy "categories_public_read" on public.categories
  for select using (true);

create policy "categories_admin_all" on public.categories
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: products
-- ============================================================
create table if not exists public.products (
  id                  uuid primary key default uuid_generate_v4(),
  name                text not null,
  slug                text not null unique,
  category_slug       text references public.categories(slug) on update cascade,
  short_description   text,
  description         text,
  price               numeric(10,2),
  price_label         text,
  is_price_on_request boolean default true,
  availability        text check (availability in ('available','unavailable','on_request')) default 'available',
  images              text[]  default '{}',
  featured            boolean default false,
  "order"             int     default 0,
  seo_title           text,
  seo_description     text,
  published           boolean default true,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

alter table public.products enable row level security;

create policy "products_public_read" on public.products
  for select using (published = true);

create policy "products_admin_all" on public.products
  for all using (auth.role() = 'authenticated');

-- Trigger updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- TABLE: packs
-- ============================================================
create table if not exists public.packs (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  slug              text not null unique,
  short_description text,
  description       text,
  inclusions        text[] default '{}',
  price_label       text default 'Sur devis',
  price             numeric(10,2),
  featured          boolean default false,
  highlight         text,
  cta_label         text default 'Demander ce pack',
  image_url         text,
  "order"           int  default 0,
  published         boolean default true,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

alter table public.packs enable row level security;

create policy "packs_public_read" on public.packs
  for select using (published = true);

create policy "packs_admin_all" on public.packs
  for all using (auth.role() = 'authenticated');

create trigger packs_updated_at
  before update on public.packs
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- TABLE: custom_requests (demandes personnalisées)
-- ============================================================
create table if not exists public.custom_requests (
  id                 uuid primary key default uuid_generate_v4(),
  full_name          text not null,
  email              text not null,
  whatsapp           text not null,
  residence_country  text,
  target_city        text,
  culture_or_country text,
  ceremony_date      date,
  estimated_budget   text,
  need_type          text check (need_type in ('products_only','list_help','complete_pack','remote_organization','advice','other')) not null,
  has_existing_list  text check (has_existing_list in ('yes','no','not_sure')),
  message            text,
  consent_to_contact boolean not null default false,
  status             text check (status in ('new','contacted','quote_sent','converted','lost')) default 'new',
  admin_notes        text,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

alter table public.custom_requests enable row level security;

-- Seuls les admins authentifiés peuvent lire les demandes
create policy "requests_admin_all" on public.custom_requests
  for all using (auth.role() = 'authenticated');

-- Insert public autorisé (formulaire visiteur)
create policy "requests_public_insert" on public.custom_requests
  for insert with check (true);

create trigger custom_requests_updated_at
  before update on public.custom_requests
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- TABLE: orders (commandes produits)
-- ============================================================
create table if not exists public.orders (
  id              uuid primary key default uuid_generate_v4(),
  full_name       text not null,
  email           text not null,
  whatsapp        text not null,
  delivery_city   text,
  delivery_country text,
  items           jsonb not null default '[]',  -- [{product_id, name, qty, price}]
  subtotal        numeric(10,2),
  notes           text,
  status          text check (status in ('pending','confirmed','in_progress','ready','delivered','cancelled')) default 'pending',
  admin_notes     text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table public.orders enable row level security;

create policy "orders_admin_all" on public.orders
  for all using (auth.role() = 'authenticated');

create policy "orders_public_insert" on public.orders
  for insert with check (true);

create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- TABLE: blog_posts
-- ============================================================
create table if not exists public.blog_posts (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text not null unique,
  excerpt         text,
  content         text,
  cover_image_url text,
  category        text default 'Traditions',
  status          text check (status in ('draft','published')) default 'draft',
  published_at    timestamptz,
  seo_title       text,
  seo_description text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table public.blog_posts enable row level security;

create policy "blog_public_read" on public.blog_posts
  for select using (status = 'published');

create policy "blog_admin_all" on public.blog_posts
  for all using (auth.role() = 'authenticated');

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- STORAGE BUCKETS — À créer MANUELLEMENT dans Supabase Dashboard
-- ============================================================
-- Dashboard > Storage > New bucket :
--   1. Nom : "product-images"   → cocher "Public bucket" → Save
--   2. Nom : "blog-images"      → cocher "Public bucket" → Save
--
-- Ensuite, Dashboard > Storage > Policies, pour chaque bucket :
--   • Allow public SELECT (lecture)
--   • Allow authenticated INSERT (upload admin)
--   • Allow authenticated DELETE (suppression admin)
--
-- ⚠️ Ne pas exécuter ces commandes dans le SQL Editor —
--    storage.buckets n'est pas accessible via l'éditeur SQL standard.
-- ============================================================

-- ============================================================
-- SEED: Catégories initiales
-- ============================================================
insert into public.categories (slug, name, description, icon, "order") values
  ('textiles-traditionnels',      'Textiles traditionnels',      'Pagnes, wax, bazin, kente et autres tissus précieux pour la dot',   '🧵', 1),
  ('tenues-traditionnelles',      'Tenues traditionnelles',      'Robes, ensembles et vêtements de cérémonie pour la future mariée',  '👗', 2),
  ('chaussures-accessoires',      'Chaussures & accessoires',    'Chaussures, ceintures, écharpes et accessoires assortis',           '👠', 3),
  ('sacs-maroquinerie',           'Sacs & maroquinerie',         'Sacs à main, pochettes et articles de maroquinerie de qualité',     '👜', 4),
  ('bijoux-parures',              'Bijoux & parures',            'Colliers, bracelets, boucles d''oreilles et parures traditionnelles','💍', 5),
  ('produits-symboliques',        'Produits symboliques',        'Noix de cola, sel, miel et autres éléments symboliques de la dot',  '🌿', 6),
  ('boissons-cadeaux',            'Boissons & cadeaux',          'Boissons traditionnelles, alcools, parfums et cadeaux d''usage',    '🍾', 7),
  ('paniers-valises-presentation','Présentation & emballage',    'Paniers, valises, malles et solutions de présentation élégante',   '🧺', 8)
on conflict (slug) do nothing;
