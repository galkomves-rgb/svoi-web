# Maps Integration

## Scope for This Phase

Only outbound links.

No embedded maps.
No route engine inside the UI.

## Supported Fields

For listings, services, and events:

- `address_text`
- `latitude`
- `longitude`
- `google_place_id`

## UI

Detail pages expose:

- `Open in Google Maps`
- `Build route`

## Link Strategy

Priority:

1. `google_place_id`
2. `latitude + longitude`
3. `address_text`

This keeps implementation simple and production-safe while preserving future expansion to map previews.
