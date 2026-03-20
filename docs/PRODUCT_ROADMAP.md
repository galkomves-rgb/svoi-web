# Product Roadmap

## Phase 0: Project Foundation
- Goal: establish a scalable frontend-first baseline.
- Scope: project structure, docs, app shell, navigation, mock data, placeholder views.
- Tasks:
- create `/src` and `/docs` structure
- define module boundaries
- implement lightweight routing
- add mock datasets per module
- document roadmap, MVP scope, modules, architecture, backlog
- Dependencies: none
- Done criteria:
- project structure is clear and modular
- all core docs exist
- app renders multiple placeholder views without backend

## Phase 1: UI Shell and Navigation
- Goal: create a stable navigation and shared layout system.
- Scope: header, footer, responsive layout, module cards, shared section components, Ukrainian-first UI text layer.
- Tasks:
- refine navigation behavior
- add route states and basic 404 fallback
- add shared card, badge, section heading, empty state patterns
- add visual consistency for all module pages
- add lightweight Ukrainian UI string object for modified views
- Dependencies: Phase 0
- Done criteria:
- users can move between all module views
- shared UI patterns are reusable
- mobile layout is usable
- modified UI strings are centralized enough for future i18n expansion

## Phase 2: Dating Module Foundation
- Goal: build privacy-first matching UI scaffolding.
- Scope: onboarding placeholders, profile cards, privacy states, request flow mockups.
- Tasks:
- define dating profile entity
- add profile list and detail layouts
- add private photo placeholder states
- add CTA states for intro request and approval
- prepare moderation and verification placeholders
- Dependencies: Phases 0-1
- Done criteria:
- dating module has coherent MVP UI
- privacy-first interaction model is visible in the interface

## Phase 3: Real Estate Listings Foundation
- Goal: launch simple property listing UX for rent and sale.
- Scope: listing feed, detail card patterns, simple filters, status badges.
- Tasks:
- define property entity schema
- add listing cards and details view
- add location and price filters
- add owner/agency placeholder metadata
- prepare future media gallery and inquiry form slots
- Dependencies: Phases 0-1
- Done criteria:
- user can browse example listings
- UI supports later extension without rewrite

## Phase 4: Business Directory Foundation
- Goal: support verified local service discovery.
- Scope: business cards, category filters, trust labels, profile detail placeholders.
- Tasks:
- define business entity schema
- add service categories
- add verification and featured states
- add detail page structure for provider profiles
- prepare contact and review placeholders
- Dependencies: Phases 0-1
- Done criteria:
- business directory supports basic browse and category filtering
- structure is ready for subscription-based featured profiles

## Product Note
- UI language is Ukrainian-first in MVP.
- User-generated content may be multilingual.
- Full multilingual support is planned later and is not implemented in the current phase.

## Phase 5: Announcements
- Goal: ship lightweight classifieds for practical everyday needs.
- Scope: jobs, buy/sell, requests, services wanted/offered.
- Tasks:
- define announcement schema
- add type filters and urgency badges
- add create-post placeholder form
- add moderation flags and report states
- Dependencies: Phases 0-1
- Done criteria:
- announcements are readable, filterable, and ready for future posting flows

## Phase 6: Events
- Goal: connect online discovery with offline trust.
- Scope: event cards, event detail placeholders, recurring format support.
- Tasks:
- define event schema
- add date and city grouping
- add RSVP placeholder states
- connect event cards with dating/community discovery hooks
- Dependencies: Phases 0-2
- Done criteria:
- events module supports discovery and later expansion to attendance logic

## Phase 7: Auth / Backend Integration
- Goal: introduce a real application data layer.
- Scope: auth, API integration, persistence, protected actions.
- Tasks:
- choose backend framework and database
- define auth model for users and business owners
- replace mock data with API calls incrementally
- add loading, error, and empty states for remote data
- Dependencies: stable frontend flows in Phases 0-6
- Done criteria:
- app can authenticate users
- at least one module reads data from backend

## Phase 8: Chat and Media Exchange
- Goal: enable controlled private interaction.
- Scope: chat, media attachments, privacy gates, safe sharing flows.
- Tasks:
- define chat model and message permissions
- add 1:1 messaging entry points
- add image/media upload placeholders
- connect dating permissions to chat/photo reveal logic
- Dependencies: Phase 7
- Done criteria:
- users can exchange private messages in a controlled MVP-safe flow

## Phase 9: Moderation / Admin Tools
- Goal: protect trust and platform quality.
- Scope: reports, content review, verification review, simple admin console.
- Tasks:
- define moderation queues
- add report reasons
- add admin content state changes
- add business/profile verification review flow
- Dependencies: Phases 2-8
- Done criteria:
- core moderation actions can be executed through internal tools

## Phase 10: Monetization and Scaling
- Goal: turn the platform into a durable local business.
- Scope: featured listings, business subscriptions, premium matching, local ads.
- Tasks:
- define paid placement surfaces
- add subscription plans for businesses
- add premium dating visibility features
- add analytics hooks for conversion and retention
- Dependencies: stable traffic and module usage across earlier phases
- Done criteria:
- at least one monetization model is live
- platform can measure conversion and retention by module
