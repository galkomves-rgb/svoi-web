import { AdminShell } from "@/features/admin/admin-shell";
import { AdminEntityCard } from "@/features/admin/admin-entity-card";
import { AdminFilterLinks } from "@/features/admin/admin-filter-links";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import type { ListingRecord } from "@/types/domain";
import { getCityNameBySlug, getListingCategoryLabel, getListingTaxonomyLabel } from "@/lib/site";
import { getAdminListingsManagerData } from "@/server/queries/admin";

type AdminListingsPageProps = {
  searchParams?: Promise<{
    city?: string;
    status?: string;
  }>;
};

export default async function AdminListingsPage({ searchParams }: AdminListingsPageProps) {
  const params = (await searchParams) ?? {};
  const { items, cities, categories } = await getAdminListingsManagerData();
  const filteredItems = items.filter((item: ListingRecord) => {
    const matchesCity = !params.city || params.city === "all" ? true : item.citySlug === params.city;
    const matchesStatus = !params.status || params.status === "all" ? true : item.status === params.status;
    return matchesCity && matchesStatus;
  });

  const cityFilters = [
    { label: "Усі міста", href: `/admin/listings?status=${params.status ?? "all"}`, active: !params.city || params.city === "all" },
    ...cities.map((city) => ({
      label: city.name,
      href: `/admin/listings?city=${city.slug}&status=${params.status ?? "all"}`,
      active: params.city === city.slug,
    })),
  ];
  const statusFilters = [
    { label: "Усі статуси", href: `/admin/listings?city=${params.city ?? "all"}&status=all`, active: !params.status || params.status === "all" },
    { label: "Опубліковано", href: `/admin/listings?city=${params.city ?? "all"}&status=published`, active: params.status === "published" },
    { label: "На перевірці", href: `/admin/listings?city=${params.city ?? "all"}&status=pending_review`, active: params.status === "pending_review" },
    { label: "Чернетки", href: `/admin/listings?city=${params.city ?? "all"}&status=draft`, active: params.status === "draft" },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Контент-модуль"
          title="Менеджер оголошень"
          description="Операційна сторінка для контролю публікацій, географії, авторів і статусів оголошень."
        />

        <AdminStatGrid
          items={[
            { label: "Усього оголошень", value: items.length },
            { label: "Після фільтрації", value: filteredItems.length },
            { label: "Категорій у модулі", value: categories.length },
            { label: "Охоплених міст", value: cities.length },
          ]}
        />

        <section className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за містом</p>
            <AdminFilterLinks items={cityFilters} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за статусом</p>
            <AdminFilterLinks items={statusFilters} />
          </div>
        </section>

        <section className="grid gap-4">
            {filteredItems.map((item: ListingRecord) => (
            <AdminEntityCard
              key={item.id}
              eyebrow={getListingTaxonomyLabel(item.categorySlug)}
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
                { label: "Район", value: item.districtSlug ?? "—" },
                { label: "Група", value: getListingCategoryLabel(item.categorySlug) },
                { label: "Ціна", value: item.priceLabel ?? "Не вказано" },
              ]}
            />
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
