import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { CatalogControlPanel } from "@/features/shared/ui/catalog-control-panel";
import { CatalogEmptyState } from "@/features/shared/ui/catalog-empty-state";
import { RealEstateCard } from "@/features/real-estate/real-estate-card";
import {
  filterCityRealEstate,
  getCityOrThrow,
  getCityParams,
  realEstateCategoryLabels,
} from "@/lib/site";

type RealEstatePageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    category?: string;
    source?: string;
    view?: string;
  }>;
};

const sourceLabels = {
  all: "Усі джерела",
  private_person: "Приватні",
  business: "Бізнес",
} as const;

export function generateStaticParams() {
  return getCityParams();
}

export default async function RealEstatePage({ params, searchParams }: RealEstatePageProps) {
  const { city: citySlug } = await params;
  const query = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedView = query.view === "grid" ? "grid" : "list";
  const items = filterCityRealEstate(city.slug, {
    category: query.category,
    authorType: query.source,
  });

  const makeHref = (next: { category?: string; source?: string; view?: "list" | "grid" }) => {
    const params = new URLSearchParams();
    const category = next.category ?? query.category ?? "all";
    const source = next.source ?? query.source ?? "all";
    const view = next.view ?? selectedView;

    if (category !== "all") params.set("category", category);
    if (source !== "all") params.set("source", source);
    if (view !== "list") params.set("view", view);

    const queryString = params.toString();
    return queryString ? `/${city.slug}/real-estate?${queryString}` : `/${city.slug}/real-estate`;
  };

  return (
    <SiteFrame city={city} currentSection="real-estate">
      <div className="section-stack">
        <section className="surface-feature p-5 lg:p-6">
          <SectionHeading
            eyebrow="Каталог"
            title="Нерухомість"
            subtitle={`Окремий шар для житла в ${city.name}: оренда, продаж, запити та пошук співмешканців без змішування з усіма оголошеннями.`}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_280px]">
          <div className="section-stack">
            <CatalogControlPanel
              resultsLabel="Обʼєктів"
              resultsValue={items.length}
              clearHref={query.category || query.source || selectedView !== "list" ? `/${city.slug}/real-estate` : undefined}
              summary={[
                ...(query.category ? [`Тип: ${realEstateCategoryLabels[query.category as keyof typeof realEstateCategoryLabels] ?? query.category}`] : []),
                ...(query.source ? [`Джерело: ${sourceLabels[query.source as keyof typeof sourceLabels] ?? query.source}`] : []),
              ]}
              viewLinks={[
                { label: "Список", href: makeHref({ view: "list" }), active: selectedView === "list" },
                { label: "Сітка", href: makeHref({ view: "grid" }), active: selectedView === "grid" },
              ]}
            >
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <p className="field-label">Тип пропозиції</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(realEstateCategoryLabels).map(([value, label]) => (
                      <a key={value} href={makeHref({ category: value === "all" ? undefined : value })} className={(query.category ?? "all") === value ? "nav-chip-active" : "nav-chip"}>
                        {label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <p className="field-label">Джерело</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(sourceLabels).map(([value, label]) => (
                      <a key={value} href={makeHref({ source: value === "all" ? undefined : value })} className={(query.source ?? "all") === value ? "nav-chip-active" : "nav-chip"}>
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CatalogControlPanel>

            {items.length ? (
              <div className={selectedView === "grid" ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
                {items.map((item) => (
                  <RealEstateCard key={item.id} citySlug={city.slug} item={item} />
                ))}
              </div>
            ) : (
              <CatalogEmptyState
                title="Поки порожньо"
                description="Спробуйте змінити тип пропозиції або джерело. Модуль нерухомості повинен залишатися чистим і структурованим."
                clearHref={`/${city.slug}/real-estate`}
              />
            )}
          </div>

          <div className="section-stack">
            <Card as="aside" className="space-y-4 bg-white/78">
              <p className="eyebrow">Навіщо окремий модуль</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Не змішуємо житло:</strong> пошук квартири чи кімнати не губиться серед роботи та побутових запитів.
                </p>
                <p>
                  <strong className="text-slate-900">Бізнес vs приватні:</strong> агентства й приватні власники читаються як різні джерела.
                </p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4">
              <p className="eyebrow">Що далі</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Наступний рівень для модуля: окремі submission-форми, бізнес-профілі агентств і повноцінні geo-фільтри по районах.</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
