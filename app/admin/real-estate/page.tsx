import { getCityNameBySlug, getRealEstateCategoryLabel, getRealEstatePropertyTypeLabel } from "@/lib/site";
import { AdminEntityCard } from "@/features/admin/admin-entity-card";
import { AdminFilterLinks } from "@/features/admin/admin-filter-links";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminShell } from "@/features/admin/admin-shell";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { getAdminRealEstateManagerData } from "@/server/queries/admin";
import type { RealEstateRecord } from "@/types/domain";

type AdminRealEstatePageProps = {
  searchParams?: Promise<{
    city?: string;
    source?: string;
  }>;
};

export default async function AdminRealEstatePage({ searchParams }: AdminRealEstatePageProps) {
  const params = (await searchParams) ?? {};
  const { items } = await getAdminRealEstateManagerData();
  const realEstateRecords: RealEstateRecord[] = items;
  const filteredItems = realEstateRecords.filter((item: RealEstateRecord) => {
    const matchesCity = !params.city || params.city === "all" ? true : item.citySlug === params.city;
    const matchesSource = !params.source || params.source === "all" ? true : item.authorType === params.source;
    return matchesCity && matchesSource;
  });

  const cityFilters = [
    { label: "Усі міста", href: `/admin/real-estate?source=${params.source ?? "all"}`, active: !params.city || params.city === "all" },
    { label: "Торревʼєха", href: `/admin/real-estate?city=torrevieja&source=${params.source ?? "all"}`, active: params.city === "torrevieja" },
    { label: "Аліканте", href: `/admin/real-estate?city=alicante&source=${params.source ?? "all"}`, active: params.city === "alicante" },
  ];

  const sourceFilters = [
    { label: "Усі джерела", href: `/admin/real-estate?city=${params.city ?? "all"}&source=all`, active: !params.source || params.source === "all" },
    { label: "Приватні", href: `/admin/real-estate?city=${params.city ?? "all"}&source=private_person`, active: params.source === "private_person" },
    { label: "Бізнес", href: `/admin/real-estate?city=${params.city ?? "all"}&source=business`, active: params.source === "business" },
  ];

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Контент-модуль"
          title="Менеджер нерухомості"
          description="Окремий operational layer для житла: оренда, продаж, запити та пошук співмешканців не повинні губитися серед загальних оголошень."
        />

        <AdminStatGrid
          items={[
            { label: "Усього обʼєктів", value: realEstateRecords.length },
            { label: "Після фільтрації", value: filteredItems.length },
            { label: "Бізнес-джерел", value: realEstateRecords.filter((item: RealEstateRecord) => item.authorType === "business").length },
            { label: "Рекомендованих", value: realEstateRecords.filter((item: RealEstateRecord) => item.featured).length },
          ]}
        />

        <section className="space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за містом</p>
            <AdminFilterLinks items={cityFilters} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Фільтр за джерелом</p>
            <AdminFilterLinks items={sourceFilters} />
          </div>
        </section>

        <section className="grid gap-4">
          {filteredItems.map((item: RealEstateRecord) => (
            <AdminEntityCard
              key={item.id}
              eyebrow={getRealEstateCategoryLabel(item.categorySlug)}
              title={item.title}
              summary={item.summary}
              badges={
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {item.authorType === "business" ? "Бізнес" : "Приватне"}
                  </span>
                  {item.isVerified ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Перевірено</span> : null}
                  {item.featured ? <span className="rounded-full bg-blue-900 px-3 py-1 text-xs font-semibold text-white">Рекомендовано</span> : null}
                </div>
              }
              meta={[
                { label: "Місто", value: getCityNameBySlug(item.citySlug) },
                { label: "Тип житла", value: getRealEstatePropertyTypeLabel(item.propertyType) },
                { label: "Ціна", value: item.priceLabel ?? "Не вказано" },
                { label: "Район", value: item.districtSlug ?? "Не вказано" },
              ]}
            />
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
