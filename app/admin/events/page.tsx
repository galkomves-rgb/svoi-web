import { AdminShell } from "@/features/admin/admin-shell";
import { AdminEntityCard } from "@/features/admin/admin-entity-card";
import { AdminFilterLinks } from "@/features/admin/admin-filter-links";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { formatEventDateRange, getCityNameBySlug, getEventCategoryLabel } from "@/lib/site";
import { getAdminEventsManagerData } from "@/server/queries/admin";
import type { CategoryDefinition, EventRecord } from "@/types/domain";

type AdminEventsPageProps = {
  searchParams?: Promise<{
    city?: string;
    category?: string;
  }>;
};

export default async function AdminEventsPage({ searchParams }: AdminEventsPageProps) {
  const params = (await searchParams) ?? {};
  const { items, cities, categories } = await getAdminEventsManagerData();
  const filteredItems = items.filter((item: EventRecord) => {
    const matchesCity = !params.city || params.city === "all" ? true : item.citySlug === params.city;
    const matchesCategory = !params.category || params.category === "all" ? true : item.categorySlug === params.category;
    return matchesCity && matchesCategory;
  });

  const cityFilters = [
    { label: "Усі міста", href: `/admin/events?category=${params.category ?? "all"}`, active: !params.city || params.city === "all" },
    ...cities.map((city) => ({
      label: city.name,
      href: `/admin/events?city=${city.slug}&category=${params.category ?? "all"}`,
      active: params.city === city.slug,
    })),
  ];
  const categoryFilters = [
    { label: "Усі типи", href: `/admin/events?city=${params.city ?? "all"}&category=all`, active: !params.category || params.category === "all" },
    ...categories.map((category: CategoryDefinition) => ({
      label: getEventCategoryLabel(category.slug),
      href: `/admin/events?city=${params.city ?? "all"}&category=${category.slug}`,
      active: params.category === category.slug,
    })),
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Контент-модуль"
          title="Менеджер подій"
          description="Операційний список подій повинен показувати тип, місто, часовий слот і репутаційні сигнали автора."
        />

        <AdminStatGrid
          items={[
            { label: "Усього подій", value: items.length },
            { label: "Після фільтрації", value: filteredItems.length },
            { label: "Типів подій", value: categories.length },
            { label: "Майбутніх подій", value: items.filter((item: EventRecord) => new Date(item.startsAt) > new Date("2026-03-20T12:00:00+01:00")).length },
          ]}
        />

        <section className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за містом</p>
            <AdminFilterLinks items={cityFilters} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за типом події</p>
            <AdminFilterLinks items={categoryFilters} />
          </div>
        </section>

        <section className="grid gap-4">
            {filteredItems.map((item: EventRecord) => (
            <AdminEntityCard
              key={item.id}
              eyebrow={getEventCategoryLabel(item.categorySlug)}
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
                { label: "Коли", value: formatEventDateRange(item.startsAt, item.endsAt) },
                { label: "CTA", value: item.ctaLabel },
                { label: "Адреса", value: item.addressText ?? "Не вказано" },
              ]}
            />
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
