import { AdminShell } from "@/features/admin/admin-shell";
import { AdminEntityCard } from "@/features/admin/admin-entity-card";
import { AdminFilterLinks } from "@/features/admin/admin-filter-links";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityNameBySlug, getServiceCategoryLabel } from "@/lib/site";
import { getAdminServicesManagerData } from "@/server/queries/admin";
import type { ServiceRecord } from "@/types/domain";

type AdminServicesPageProps = {
  searchParams?: Promise<{
    city?: string;
    author?: string;
  }>;
};

export default async function AdminServicesPage({ searchParams }: AdminServicesPageProps) {
  const params = (await searchParams) ?? {};
  const { items, cities, categories } = await getAdminServicesManagerData();
  const filteredItems = items.filter((item: ServiceRecord) => {
    const matchesCity = !params.city || params.city === "all" ? true : item.citySlug === params.city;
    const matchesAuthor = !params.author || params.author === "all" ? true : item.authorType === params.author;
    return matchesCity && matchesAuthor;
  });

  const cityFilters = [
    { label: "Усі міста", href: `/admin/services?author=${params.author ?? "all"}`, active: !params.city || params.city === "all" },
    ...cities.map((city) => ({
      label: city.name,
      href: `/admin/services?city=${city.slug}&author=${params.author ?? "all"}`,
      active: params.city === city.slug,
    })),
  ];
  const authorFilters = [
    { label: "Усі автори", href: `/admin/services?city=${params.city ?? "all"}&author=all`, active: !params.author || params.author === "all" },
    { label: "Бізнес", href: `/admin/services?city=${params.city ?? "all"}&author=business`, active: params.author === "business" },
    { label: "Приватні", href: `/admin/services?city=${params.city ?? "all"}&author=private_person`, active: params.author === "private_person" },
    { label: "Організації", href: `/admin/services?city=${params.city ?? "all"}&author=community_org`, active: params.author === "community_org" },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Контент-модуль"
          title="Менеджер послуг"
          description="Тут має бути видно розмежування між приватними пропозиціями, бізнесами та організаціями, а також рівень довіри до кожної картки."
        />

        <AdminStatGrid
          items={[
            { label: "Усього профілів", value: items.length },
            { label: "Після фільтрації", value: filteredItems.length },
            { label: "Категорій у модулі", value: categories.length },
            { label: "Перевірених профілів", value: items.filter((item: ServiceRecord) => item.isVerified).length },
          ]}
        />

        <section className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за містом</p>
            <AdminFilterLinks items={cityFilters} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за типом автора</p>
            <AdminFilterLinks items={authorFilters} />
          </div>
        </section>

        <section className="grid gap-4">
            {filteredItems.map((item: ServiceRecord) => (
            <AdminEntityCard
              key={item.id}
              eyebrow={getServiceCategoryLabel(item.categorySlug)}
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
                { label: "Контакт", value: item.contactLabel },
                { label: "Адреса", value: item.addressText ?? "Не вказано" },
                { label: "Бізнес-профіль", value: item.businessProfileSlug ?? "Не прив'язано" },
              ]}
            />
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
