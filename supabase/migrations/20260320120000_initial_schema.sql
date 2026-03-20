create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";

create type content_status as enum (
  'draft',
  'pending_review',
  'changes_requested',
  'approved',
  'published',
  'rejected',
  'archived',
  'expired'
);

create type visibility_type as enum (
  'public',
  'unlisted',
  'private',
  'hidden_by_moderation'
);

create type author_type as enum (
  'private_person',
  'business',
  'community_org',
  'editorial',
  'official'
);

create type geo_scope_type as enum (
  'country',
  'region',
  'city',
  'district'
);

create type module_key as enum (
  'listings',
  'services',
  'events',
  'guides',
  'resources',
  'search'
);

create table if not exists geography_countries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  code text unique not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists geography_regions (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references geography_countries(id) on delete cascade,
  slug text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (country_id, slug)
);

create table if not exists geography_cities (
  id uuid primary key default gen_random_uuid(),
  region_id uuid not null references geography_regions(id) on delete cascade,
  slug text not null,
  name text not null,
  hero_title text,
  hero_lead text,
  created_at timestamptz not null default now(),
  unique (region_id, slug)
);

create table if not exists geography_districts (
  id uuid primary key default gen_random_uuid(),
  city_id uuid not null references geography_cities(id) on delete cascade,
  slug text not null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (city_id, slug)
);

create table if not exists users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'user',
  author_type author_type not null default 'private_person',
  city_id uuid references geography_cities(id),
  business_profile_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists business_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete set null,
  slug text unique not null,
  name text not null,
  summary text not null,
  description text not null,
  status content_status not null default 'draft',
  visibility visibility_type not null default 'public',
  category_slug text not null,
  geo_scope_type geo_scope_type not null default 'city',
  country_id uuid not null references geography_countries(id),
  region_id uuid not null references geography_regions(id),
  city_id uuid not null references geography_cities(id),
  district_id uuid references geography_districts(id),
  is_verified boolean not null default false,
  website_url text,
  contact_label text not null,
  address_text text,
  latitude double precision,
  longitude double precision,
  google_place_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table users_profile
  add constraint users_profile_business_profile_fk
  foreign key (business_profile_id)
  references business_profiles(id)
  on delete set null;

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  module_key module_key not null,
  slug text not null,
  label text not null,
  schema_key text not null,
  parent_slug text,
  created_at timestamptz not null default now(),
  unique (module_key, slug)
);

create table if not exists category_schemas (
  id uuid primary key default gen_random_uuid(),
  schema_key text unique not null,
  module_key module_key not null,
  title text not null,
  fields_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete set null,
  storage_bucket text not null default 'entity-media',
  storage_path text not null,
  mime_type text,
  alt_text text,
  created_at timestamptz not null default now()
);

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body text,
  category_slug text not null,
  status content_status not null default 'draft',
  visibility visibility_type not null default 'public',
  author_type author_type not null,
  is_verified boolean not null default false,
  featured boolean not null default false,
  business_profile_id uuid references business_profiles(id) on delete set null,
  owner_profile_id uuid references users_profile(id) on delete set null,
  geo_scope_type geo_scope_type not null default 'city',
  country_id uuid not null references geography_countries(id),
  region_id uuid not null references geography_regions(id),
  city_id uuid not null references geography_cities(id),
  district_id uuid references geography_districts(id),
  address_text text,
  latitude double precision,
  longitude double precision,
  google_place_id text,
  price_label text,
  tags text[] not null default '{}',
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body text,
  category_slug text not null,
  status content_status not null default 'draft',
  visibility visibility_type not null default 'public',
  author_type author_type not null,
  is_verified boolean not null default false,
  featured boolean not null default false,
  business_profile_id uuid references business_profiles(id) on delete set null,
  owner_profile_id uuid references users_profile(id) on delete set null,
  geo_scope_type geo_scope_type not null default 'city',
  country_id uuid not null references geography_countries(id),
  region_id uuid not null references geography_regions(id),
  city_id uuid not null references geography_cities(id),
  district_id uuid references geography_districts(id),
  address_text text,
  latitude double precision,
  longitude double precision,
  google_place_id text,
  contact_label text not null,
  tags text[] not null default '{}',
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body text,
  category_slug text not null,
  status content_status not null default 'draft',
  visibility visibility_type not null default 'public',
  author_type author_type not null,
  is_verified boolean not null default false,
  featured boolean not null default false,
  business_profile_id uuid references business_profiles(id) on delete set null,
  owner_profile_id uuid references users_profile(id) on delete set null,
  geo_scope_type geo_scope_type not null default 'city',
  country_id uuid not null references geography_countries(id),
  region_id uuid not null references geography_regions(id),
  city_id uuid not null references geography_cities(id),
  district_id uuid references geography_districts(id),
  address_text text,
  latitude double precision,
  longitude double precision,
  google_place_id text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body text,
  category_slug text not null,
  status content_status not null default 'draft',
  visibility visibility_type not null default 'public',
  author_type author_type not null,
  is_verified boolean not null default false,
  featured boolean not null default false,
  geo_scope_type geo_scope_type not null default 'city',
  country_id uuid not null references geography_countries(id),
  region_id uuid not null references geography_regions(id),
  city_id uuid not null references geography_cities(id),
  district_id uuid references geography_districts(id),
  steps text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists entity_media (
  id uuid primary key default gen_random_uuid(),
  media_id uuid not null references media(id) on delete cascade,
  entity_table text not null,
  entity_id uuid not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  module_key module_key not null,
  category_slug text not null,
  title text not null,
  summary text not null,
  body text,
  author_type author_type not null,
  business_profile_id uuid references business_profiles(id) on delete set null,
  payload jsonb not null default '{}'::jsonb,
  geo_scope_type geo_scope_type not null default 'city',
  country_id uuid not null references geography_countries(id),
  region_id uuid not null references geography_regions(id),
  city_id uuid not null references geography_cities(id),
  district_id uuid references geography_districts(id),
  status content_status not null default 'pending_review',
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists moderation_logs (
  id uuid primary key default gen_random_uuid(),
  entity_table text not null,
  entity_id uuid not null,
  action text not null,
  previous_status content_status,
  next_status content_status not null,
  note text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  entity_table text not null,
  entity_id uuid not null,
  reason text not null,
  status text not null default 'open',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists search_index (
  id uuid primary key default gen_random_uuid(),
  module_key module_key not null,
  entity_table text not null,
  entity_id uuid not null,
  entity_slug text not null,
  title text not null,
  summary text not null,
  body_text text not null default '',
  category_slug text not null,
  city_slug text not null,
  author_type author_type not null,
  is_business boolean not null default false,
  featured boolean not null default false,
  published_at timestamptz,
  document tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(summary, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(body_text, '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(category_slug, '')), 'C') ||
    setweight(to_tsvector('simple', coalesce(city_slug, '')), 'D')
  ) stored
);

create table if not exists promotions (
  id uuid primary key default gen_random_uuid(),
  module_key module_key not null,
  entity_table text not null,
  entity_id uuid not null,
  label text not null,
  active_from timestamptz not null,
  active_until timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_regions_country on geography_regions(country_id);
create index if not exists idx_cities_region on geography_cities(region_id);
create index if not exists idx_districts_city on geography_districts(city_id);
create index if not exists idx_listings_geo on listings(country_id, region_id, city_id, district_id);
create index if not exists idx_services_geo on services(country_id, region_id, city_id, district_id);
create index if not exists idx_events_geo on events(country_id, region_id, city_id, district_id);
create index if not exists idx_guides_geo on guides(country_id, region_id, city_id, district_id);
create index if not exists idx_submissions_status on submissions(status, module_key);
create index if not exists idx_reports_status on reports(status);
create index if not exists idx_search_index_document on search_index using gin(document);
create index if not exists idx_search_index_filters on search_index(module_key, city_slug, category_slug, author_type, featured);
