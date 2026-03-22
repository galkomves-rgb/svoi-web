import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { CatalogControlPanel } from "@/features/shared/ui/catalog-control-panel";
import { CatalogEmptyState } from "@/features/shared/ui/catalog-empty-state";
import { ResourceEntityCard } from "@/features/resources/resource-entity-card";
import {
  filterCityResources,
  getCityOrThrow,
  getCityParams,
  resourceCategoryLabels,
  getResourceCategoryLabel,
  resourcePlatformLabels,
} from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getCityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);

  return buildMetadata({
    title: `${city.name}: ресурси спільноти`,
    description: `Перевірені Telegram, Facebook, Instagram і зовнішні ресурси спільноти для ${city.name}.`,
    path: `/${city.slug}/resources`,
  });
}

type ResourcesPageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    category?: string;
    platform?: string;
    featured?: string;
    view?: string;
  }>;
};

export default async function ResourcesPage({ params, searchParams }: ResourcesPageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedCategory = filters.category ?? "all";
  const selectedPlatform = filters.platform ?? "all";
  const featuredOnly = filters.featured === "1";
  const selectedView = filters.view === "grid" ? "grid" : "list";
  const resources = filterCityResources(city.slug, {
    category: selectedCategory,
    platform: selectedPlatform,
    featuredOnly,
  });

  const makeHref = (next: { category?: string; platform?: string; featured?: boolean; view?: "list" | "grid" }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const platform = next.platform ?? selectedPlatform;
    const featured = typeof next.featured === "boolean" ? next.featured : featuredOnly;
    const view = next.view ?? selectedView;

    if (category !== "all") params.set("category", category);
    if (platform !== "all") params.set("platform", platform);
    if (featured) params.set("featured", "1");
    if (view !== "list") params.set("view", view);

    const query = params.toString();
    return query ? `/${city.slug}/resources?${query}` : `/${city.slug}/resources`;
  };

  return (
    <SiteFrame city={city} currentSection="resources">
      <div className="section-stack">
        <section className="surface-feature p-5 lg:p-6">
          <SectionHeading
            eyebrow="Каталог"
            title="Ресурси спільноти"
            subtitle={`Зібрані в одному місці перевірені канали, групи і корисні зовнішні ресурси для ${city.name}.`}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
          <div className="section-stack">
            <CatalogControlPanel
              resultsLabel="Ресурсів"
              resultsValue={resources.length}
              clearHref={selectedCategory !== "all" || selectedPlatform !== "all" || featuredOnly || selectedView !== "list" ? `/${city.slug}/resources` : undefined}
              summary={[
                ...(selectedPlatform !== "all" ? [`Платформа: ${resourcePlatformLabels[selectedPlatform as keyof typeof resourcePlatformLabels]}`] : []),
                ...(selectedCategory !== "all" ? [`Категорія: ${getResourceCategoryLabel(selectedCategory)}`] : []),
                ...(featuredOnly ? ["Лише рекомендовані"] : []),
              ]}
              viewLinks={[
                { label: "Список", href: makeHref({ view: "list" }), active: selectedView === "list" },
                { label: "Сітка", href: makeHref({ view: "grid" }), active: selectedView === "grid" },
              ]}
            >
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <p className="field-label">Платформа</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(resourcePlatformLabels).map(([value, label]) => (
                      <a key={value} href={makeHref({ platform: value })} className={selectedPlatform === value ? "nav-chip-active" : "nav-chip"}>
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <p className="field-label">Категорія</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={makeHref({ category: "all" })} className={selectedCategory === "all" ? "nav-chip-active" : "nav-chip"}>
                      Усі категорії
                    </a>
                    {Object.entries(resourceCategoryLabels)
                      .filter(([value]) => value !== "all")
                      .map(([value, label]) => (
                        <a key={value} href={makeHref({ category: value })} className={selectedCategory === value ? "nav-chip-active" : "nav-chip"}>
                          {label}
                        </a>
                      ))}
                    <a href={makeHref({ featured: !featuredOnly })} className={featuredOnly ? "nav-chip-active" : "nav-chip"}>
                      Лише рекомендовані
                    </a>
                  </div>
                </div>
              </div>
            </CatalogControlPanel>

            {resources.length ? (
              <div className={selectedView === "grid" ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
                {resources.map((resource) => (
                  <ResourceEntityCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <CatalogEmptyState
                title="Поки ресурсів не знайдено"
                description="Спробуйте іншу платформу або вимкніть фільтр рекомендованих."
                clearHref={`/${city.slug}/resources`}
              />
            )}
          </div>

          <div className="section-stack">
            <Card as="aside" className="space-y-4 bg-white/78">
              <p className="eyebrow">Навіщо цей модуль</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Ресурси дають швидкий доступ до вже існуючих community-точок, не намагаючись копіювати Telegram чи Facebook.</p>
                <p>Це trusted aggregation layer, який з часом переводить користувача у власні модулі платформи.</p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4">
              <p className="eyebrow">Що далі</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Далі тут можуть з’явитися рейтинг корисності, moderation reviews і partner placements.</p>
                <p>Поки головна задача — дати мешканцю міста швидкий і безпечний список живих community-ресурсів.</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
