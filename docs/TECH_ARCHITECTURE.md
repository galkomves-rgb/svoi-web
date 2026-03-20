# Technical Architecture

## Current Runtime

- Next.js App Router
- TypeScript
- Tailwind CSS
- Server Components by default
- feature-based folders for domain UI
- server repository/query layer
- Supabase-ready backend integration with mock fallback

## Core Principles

- geo-first everywhere
- separate tables per domain, not one generic posts table
- moderated submissions instead of direct publishing
- business/private distinction in both data model and UI
- shared schema system for dynamic forms
- keep runtime deployable on Vercel without custom server

## Code Organization

- `app/*`: routes and page composition
- `features/*`: module UI and reusable feature components
- `server/*`: repositories, server actions, moderation rules, Supabase access
- `schemas/*`: Zod and category schema system
- `types/*`: shared domain and database types
- `data/*`: local mock fallback and seed-aligned content
- `supabase/*`: SQL migrations and seed scripts

## Data Flow

1. public route calls server query
2. query uses repository interface
3. repository resolves to Supabase when env exists
4. otherwise repository falls back to local mock content
5. public submissions go through server action
6. action validates with Zod and writes to `submissions`
7. moderation queue decides what becomes publishable content

## Supabase Strategy

- Postgres holds structured geo/content tables
- Auth governs ownership and moderation permissions
- Storage is reserved for entity media
- RLS controls public visibility and author ownership
- search uses `search_index` table + PostgreSQL full-text strategy

## Route Model

- `/[city]/...` is the default public content pattern
- `/search` is global and cross-module
- `/add/*` creates moderated submissions
- `/admin/*` is backoffice shell for editors and moderators
- `/business/[slug]` is the canonical business profile route

## Why This Is Not Overengineered

- repository layer is intentionally small
- mock fallback avoids blocking build and local work
- category schemas are simple JSON-driven field definitions
- no chat, no advanced dashboards, no embedded maps
- enough structure for scale without building a full enterprise backend now
