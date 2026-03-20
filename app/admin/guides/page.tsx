import { AdminShell } from "@/features/admin/admin-shell";
import { AdminEntityCard } from "@/features/admin/admin-entity-card";
import { AdminFilterLinks } from "@/features/admin/admin-filter-links";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getAdminGuidesManagerData } from "@/server/queries/admin";
import { getCityNameBySlug, getGuideCategoryLabel } from "@/lib/site";
import type { CategoryDefinition, GuideRecord } from "@/types/domain";

type AdminGuidesPageProps = {
  searchParams?: Promise<{
    city?: string;
    category?: string;
  }>;
};

export default async function AdminGuidesPage({ searchParams }: AdminGuidesPageProps) {
  const params = (await searchParams) ?? {};
  const { items, cities, categories } = await getAdminGuidesManagerData();
  const filteredItems = items.filter((item: GuideRecord) => {
    const matchesCity = !params.city || params.city === "all" ? true : item.citySlug === params.city;
    const matchesCategory = !params.category || params.category === "all" ? true : item.categorySlug === params.category;
    return matchesCity && matchesCategory;
  });

  const cityFilters = [
    { label: "Усі міста", href: `/admin/guides?category=${params.category ?? "all"}`, active: !params.city || params.city === "all" },
    ...cities.map((city) => ({
      label: city.name,
      href: `/admin/guides?city=${city.slug}&category=${params.category ?? "all"}`,
      active: params.city === city.slug,
    })),
  ];
  const categoryFilters = [
    { label: "Усі категорії", href: `/admin/guides?city=${params.city ?? "all"}&category=all`, active: !params.category || params.category === "all" },
    ...categories.map((category: CategoryDefinition) => ({
      label: getGuideCategoryLabel(category.slug),
      href: `/admin/guides?city=${params.city ?? "all"}&category=${category.slug}`,
      active: params.category === category.slug,
    })),
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Контент-модуль"
          title="Менеджер гідів"
          description="Гіди мають бути редакційним шаром платформи: чіткі категорії, місто, сценарій користі й наступні кроки."
        />

        <AdminStatGrid
          items={[
            { label: "Усього гідів", value: items.length },
            { label: "Після фільтрації", value: filteredItems.length },
            { label: "Категорій у модулі", value: categories.length },
            { label: "Рекомендованих", value: items.filter((item: GuideRecord) => item.featured).length },
          ]}
        />

        <section className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за містом</p>
            <AdminFilterLinks items={cityFilters} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за категорією</p>
            <AdminFilterLinks items={categoryFilters} />
          </div>
        </section>

        <section className="grid gap-4">
            {filteredItems.map((item: GuideRecord) => (
            <AdminEntityCard
              key={item.id}
              eyebrow={getGuideCategoryLabel(item.categorySlug)}
              title={item.title}
              summary={item.summary}
              badges={
                <div className="flex flex-wrap justify-end gap-2">
                  <AuthorBadge authorType={item.authorType} verified={item.isVerified} />
                  <StatusBadge status={item.status} visibility={item.visibility} featured={item.featured} />
                </div>
              }
              meta={[
                { label: "Місто", value: getCityNameBySlug(item.citySlug) },
                { label: "Кроків", value: item.steps.length },
                { label: "Адресність", value: item.geoScopeType },
                { label: "Оновлено", value: new Date(item.updatedAt).toLocaleDateString("uk-UA") },
              ]}
            />
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
