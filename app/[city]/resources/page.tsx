import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { ResourceEntityCard } from "@/features/resources/resource-entity-card";
import {
  filterCityResources,
  getCityOrThrow,
  getCityParams,
  guideCategoryLabels,
  resourcePlatformLabels,
} from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

type ResourcesPageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    category?: string;
    platform?: string;
    featured?: string;
  }>;
};

export default async function ResourcesPage({ params, searchParams }: ResourcesPageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedCategory = filters.category ?? "all";
  const selectedPlatform = filters.platform ?? "all";
  const featuredOnly = filters.featured === "1";
  const resources = filterCityResources(city.slug, {
    category: selectedCategory,
    platform: selectedPlatform,
    featuredOnly,
  });

  const makeHref = (next: { category?: string; platform?: string; featured?: boolean }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const platform = next.platform ?? selectedPlatform;
    const featured = typeof next.featured === "boolean" ? next.featured : featuredOnly;

    if (category !== "all") params.set("category", category);
    if (platform !== "all") params.set("platform", platform);
    if (featured) params.set("featured", "1");

    const query = params.toString();
    return query ? `/${city.slug}/resources?${query}` : `/${city.slug}/resources`;
  };

  return (
    <SiteFrame city={city} currentSection="resources">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Ресурси спільноти"
            subtitle={`Зібрані в одному місці перевірені канали, групи і корисні зовнішні ресурси для ${city.name}.`}
          />
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              {Object.entries(resourcePlatformLabels).map(([value, label]) => (
                <a
                  key={value}
                  href={makeHref({ platform: value })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedPlatform === value ? "border-blue-900 bg-blue-900 text-white" : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={makeHref({ category: "all" })}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === "all" ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                Усі категорії
              </a>
              {Object.entries(guideCategoryLabels)
                .filter(([value]) => value !== "all")
                .map(([value, label]) => (
                  <a
                    key={value}
                    href={makeHref({ category: value })}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedCategory === value ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              <a
                href={makeHref({ featured: !featuredOnly })}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  featuredOnly ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                Лише рекомендовані
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              Ресурсів: <span className="font-semibold text-slate-900">{resources.length}</span>
            </p>
            {resources.length ? (
              <div className="grid gap-4">
                {resources.map((resource) => (
                  <ResourceEntityCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <Card as="section" className="space-y-3 rounded-3xl bg-slate-50">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Поки ресурсів не знайдено</h2>
                <p className="text-sm leading-7 text-slate-600">Спробуйте іншу платформу або вимкніть фільтр рекомендованих.</p>
                <a href={`/${city.slug}/resources`} className="cta-secondary">
                  Очистити фільтри
                </a>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Навіщо цей модуль</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Ресурси дають швидкий доступ до вже існуючих community-точок, не намагаючись копіювати Telegram чи Facebook.</p>
                <p>Це trusted aggregation layer, який з часом переводить користувача у власні модулі платформи.</p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4 rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що далі</p>
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
