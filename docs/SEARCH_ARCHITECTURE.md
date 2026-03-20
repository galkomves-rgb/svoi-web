# Search Architecture

## Goal

One search system across:

- listings
- services
- events
- guides

## Storage Strategy

Use `search_index` as the cross-module search table.

Fields:

- `module_key`
- `entity_table`
- `entity_id`
- `entity_slug`
- `title`
- `summary`
- `body_text`
- `category_slug`
- `city_slug`
- `author_type`
- `is_business`
- `featured`
- `published_at`
- generated `tsvector` document

## Query Strategy

Search should support:

- title
- summary
- body
- category
- city

Filters:

- city
- module
- category
- author_type
- business/private
- featured
- date

## Runtime Architecture

- global input in header
- `/search` page for full results
- repository method `search(filters)`
- Supabase implementation later uses PostgreSQL full-text queries
- mock repository already supports fallback filtering for local dev

## Admin Side

`/admin/search` is the first shell for search index monitoring and future rebuild tools.
