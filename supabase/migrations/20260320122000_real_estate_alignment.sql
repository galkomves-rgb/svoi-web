alter type module_key add value if not exists 'real-estate';

create table if not exists real_estate (
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
  property_type text not null,
  bedrooms integer,
  bathrooms integer,
  area_sqm integer,
  furnished boolean not null default false,
  pets_allowed boolean not null default false,
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_real_estate_geo on real_estate(country_id, region_id, city_id, district_id);

alter table real_estate enable row level security;

create policy "public can read published public real estate"
on real_estate for select
using (status = 'published' and visibility = 'public');

create policy "moderators manage real estate"
on real_estate for all
using (public.is_moderator())
with check (public.is_moderator());
