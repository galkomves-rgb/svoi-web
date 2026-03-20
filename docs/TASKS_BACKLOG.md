# Tasks Backlog

| Epic | Task | Priority | Status | Notes |
| --- | --- | --- | --- | --- |
| App Shell | Build responsive shell with header, nav, footer | High | Done | Initial foundation implemented |
| App Shell | Refine homepage messaging and module positioning | Medium | Done | Homepage and city dashboards now reflect the current MVP core |
| Routing | Implement geo-first App Router structure | High | Done | Next.js route tree uses `/[city]/...` |
| Routing | Add route-level empty/error states | Medium | Todo | Needed before backend integration |
| Shared UI | Create reusable cards, tags, section patterns | High | Done | Keep expanding only when repetition appears |
| Shared UI | Add form field styles and button variants | Medium | Todo | Required for future posting/auth flows |
| Shared UI | Move modified UI strings into lightweight UA i18n object | High | Done | Ukrainian-first shell retained |
| Listings UI | Preserve category state during search | High | Done | Search and category now share one query state |
| Listings UI | Add list/detail shared card system | High | Done | Cards reused on homepage and city dashboard |
| Listings UI | Add richer empty/result summary states | Medium | Done | Improve clarity during filtering |
| Start UI | Expand newcomer flow with city-aware actions | High | Done | Start now routes users into city-specific guide, listings, services, and events |
| Events UI | Strengthen event cards with city-specific follow-up | Medium | Todo | Supports retention and social proof |
| Services UI | Add richer service trust and contact blocks | Medium | Todo | Supports monetization and trust framing |
| Dating UI | Add privacy-first profile card states | High | Todo | Blur, request, approved, hidden states |
| Dating UI | Add onboarding intent selector mockup | High | Todo | Friends / networking / relationships |
| Dating UI | Add future verification badge placeholder | Medium | Todo | Needed for trust framing |
| Dating UI | Add locked photo and approved-chat states | High | Todo | Chat and reveal only after allowed state |
| Real Estate UI | Build property listing cards and detail view | High | Todo | Current page is placeholder list only |
| Real Estate UI | Add simple location and price filters | Medium | Todo | No advanced filters yet |
| Community Resources UI | Add curated external resource cards with metadata | High | Todo | Include source, city, activity, trust notes |
| Mock Data | Define normalized sample data shape per module | High | Done | Good enough for current runtime rendering |
| Mock Data | Add richer multilingual examples in priority modules | High | Done | UI remains Ukrainian-first |
| Mock Data | Add image placeholders for future richer cards | Medium | Todo | Useful for stronger visual testing |
| Quality | Add typecheck and lint scripts | High | In Progress | Depends on adding local ESLint baseline to the Next app |
| Quality | Expand smoke coverage for Start and empty-state flows | Medium | Todo | Needed before more modules are added |
| Auth Placeholders | Define future auth entry points in nav and header | Medium | Todo | No real auth in MVP |
| Auth Placeholders | Add protected-action UI states | Low | Todo | For posting and messaging flows later |
