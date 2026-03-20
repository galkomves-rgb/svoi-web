# uahub.world

Geo-first modular platform for Ukrainian communities on `Next.js + Supabase`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase: Postgres, Auth, Storage
- React Hook Form
- Zod
- Playwright + Vitest

## Foundation Scope

Implemented in this foundation:

- geo-first route tree
- Supabase SQL migrations and RLS foundation
- seed SQL for base geography and categories
- typed domain and database types
- server-side repository/query layer
- moderated public submission flows
- admin shell and moderation queue foundation
- category-driven form foundation
- search page and search architecture foundation
- maps outbound links on detail pages

## Routes

- `/`
- `/start`
- `/[city]`
- `/[city]/listings`
- `/[city]/listings/[slug]`
- `/[city]/real-estate`
- `/[city]/real-estate/[slug]`
- `/[city]/services`
- `/[city]/services/[slug]`
- `/[city]/events`
- `/[city]/events/[slug]`
- `/[city]/guide`
- `/[city]/guide/[slug]`
- `/search`
- `/add/listing`
- `/add/service`
- `/add/event`
- `/admin`
- `/admin/moderation`
- `/admin/listings`
- `/admin/services`
- `/admin/events`
- `/admin/guides`
- `/admin/categories`
- `/admin/geography`
- `/admin/businesses`
- `/admin/reports`
- `/admin/search`
- `/business/[slug]`

## Install

```sh
npm install
```

If Playwright browsers are not installed yet:

```sh
npx playwright install
```

## Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The app still works without these values by falling back to local mock repositories for development.

## Supabase

Apply schema and policies using the SQL files in:

- `supabase/migrations`
- `supabase/seed.sql`

Recommended order:

1. initial schema
2. RLS policies
3. seed SQL

## Dev

```sh
npm run dev
```

Local app:

```text
http://127.0.0.1:3000
```

## Quality

```sh
npm run typecheck
npm run lint
npm run test:unit
npm run smoke
```

## Build

```sh
npm run build
```

## Deploy

Recommended target: Vercel.

1. Push repository to GitHub.
2. Import into Vercel.
3. Keep default Next.js preset.
4. Configure Supabase environment variables.
5. Use default build command:

```text
npm run build
```

## Structure

- `app` - App Router routes
- `features` - feature-based UI and UX modules
- `server` - repositories, queries, server actions, moderation logic
- `schemas` - Zod validation and category schema builders
- `types` - domain and database types
- `data` - local mock content and taxonomy fallback
- `supabase` - migrations and seeds
- `docs` - technical and product architecture docs
- `tests` - smoke and unit tests

## Language Rules

- code, schema, types and database naming stay in English
- user-facing UI stays in Ukrainian by default
- localization is prepared from the start and should be kept extensible
- content can be multilingual when this reflects real community usage
