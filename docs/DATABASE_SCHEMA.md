# Database Schema

## Geography

- `geography_countries`
- `geography_regions`
- `geography_cities`
- `geography_districts`

All content entities reference geography and include `geo_scope_type`.

## Identity

- `users_profile`
- `business_profiles`

`users_profile` stores user role and author type.
`business_profiles` models business-owned content separately from private content.

## Taxonomy

- `categories`
- `category_schemas`

`categories` define per-module taxonomy.
`category_schemas` define dynamic form fields by `schema_key`.

## Core Content

- `listings`
- `services`
- `events`
- `guides`

Each table includes:

- moderation status
- visibility
- author type
- geo references
- optional business profile link
- maps fields

## Media

- `media`
- `entity_media`

Storage metadata is separated from entity linkage.

## Moderation and Safety

- `submissions`
- `moderation_logs`
- `reports`

Public users create submissions.
Moderators decide what advances to published content.

## Search and Promotion

- `search_index`
- `promotions`

`search_index` stores cross-module searchable documents.
`promotions` stores featured visibility windows.

## Status Model

- `draft`
- `pending_review`
- `changes_requested`
- `approved`
- `published`
- `rejected`
- `archived`
- `expired`

## Visibility Model

- `public`
- `unlisted`
- `private`
- `hidden_by_moderation`

## Author Types

- `private_person`
- `business`
- `community_org`
- `editorial`
- `official`
