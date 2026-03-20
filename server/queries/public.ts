import { getContentRepository } from "@/server/content";
import type { SearchFilters } from "@/server/repositories/content-repository";

export async function getPublicHomeData() {
  const repository = getContentRepository();
  const [cities, listings, events, guides] = await Promise.all([
    repository.listCities(),
    repository.listListings({ featuredOnly: true }),
    repository.listEvents(),
    repository.listGuides(),
  ]);

  return {
    cities,
    listings: listings.slice(0, 4),
    events: events.slice(0, 4),
    guides: guides.slice(0, 4),
  };
}

export async function getCityOverview(citySlug: string) {
  const repository = getContentRepository();
  const [city, listings, events, services, guides] = await Promise.all([
    repository.getCity(citySlug),
    repository.listListings({ citySlug }),
    repository.listEvents(citySlug),
    repository.listServices(citySlug),
    repository.listGuides(citySlug),
  ]);

  return {
    city,
    listings: listings.slice(0, 4),
    events: events.slice(0, 3),
    services: services.slice(0, 3),
    guides: guides.slice(0, 3),
  };
}

export async function getSearchResults(filters: SearchFilters) {
  return getContentRepository().search(filters);
}
