# Technical Architecture

## Current Version: Frontend-First
- Static HTML entry point
- Vanilla JavaScript modules
- Lightweight hash-based routing
- Mock data files per module
- Shared components for layout and repeated UI patterns
- CSS organized under `src/styles`

## Why This Fits the Project
- fast to iterate
- no framework lock-in at the idea validation stage
- simple local development and easy handoff
- supports module-by-module evolution without rewriting the full app
- keeps complexity low while the product definition is still changing

## Current Structure
- `index.html`: static entry point
- `app.js`: thin bootstrap layer
- `src/app.js`: app startup
- `src/modules/router.js`: route mapping and rendering
- `src/components/*`: reusable UI building blocks
- `src/pages/*`: route-level views
- `src/data/*`: mock content for each module
- `src/styles/*`: styling system
- `docs/*`: product and technical planning

## Future Upgrade Path
1. keep current page/component boundaries
2. replace mock data files with API clients
3. introduce auth-aware user state
4. move sensitive flows to backend-backed endpoints
5. add storage for media and structured moderation tools

## Recommended Future Stack
- Frontend:
- Next.js or React with App Router when routing, auth state, and SEO become more important
- keep design tokens and module boundaries from current structure
- Backend:
- Node.js with NestJS or Express for modular API design
- good fit for auth, moderation workflows, and future chat service integration
- Database:
- PostgreSQL
- strong relational fit for users, listings, events, business profiles, and moderation states
- File Storage:
- S3-compatible object storage
- suitable for profile images, listing media, and event assets
- Chat:
- start with a managed provider or websocket service later
- possible options: Stream, Supabase Realtime, or custom websocket service when volume justifies it
- Admin / Moderation:
- internal admin panel built after backend is stable
- could start with a protected admin frontend and backend moderation endpoints

## Architecture Principles
- module-first boundaries
- frontend can function without backend during early discovery
- data contracts should be explicit and replaceable
- privacy-sensitive flows must remain backend-controlled once implemented
- avoid overengineering until core module usage is validated
