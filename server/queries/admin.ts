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
