import { getContentRepository } from "@/server/content";

export async function getAdminDashboardData() {
  const repository = getContentRepository();
  const [summary, submissions, reports, categories, cities] = await Promise.all([
    repository.getAdminSummary(),
    repository.listSubmissions(),
    repository.listReports(),
    repository.listCategories(),
    repository.listCities(),
  ]);

  return {
    summary,
    submissions,
    reports,
    categories,
    cities,
  };
}

export async function getAdminListingsManagerData() {
  const repository = getContentRepository();
  const [items, cities, categories] = await Promise.all([
    repository.listListings(),
    repository.listCities(),
    repository.listCategories("listings"),
  ]);

  return { items, cities, categories };
}

export async function getAdminServicesManagerData() {
  const repository = getContentRepository();
  const [items, cities, categories] = await Promise.all([
    repository.listServices(),
    repository.listCities(),
    repository.listCategories("services"),
  ]);

  return { items, cities, categories };
}

export async function getAdminEventsManagerData() {
  const repository = getContentRepository();
  const [items, cities, categories] = await Promise.all([
    repository.listEvents(),
    repository.listCities(),
    repository.listCategories("events"),
  ]);

  return { items, cities, categories };
}

export async function getAdminGuidesManagerData() {
  const repository = getContentRepository();
  const [items, cities, categories] = await Promise.all([
    repository.listGuides(),
    repository.listCities(),
    repository.listCategories("guides"),
  ]);

  return { items, cities, categories };
}
