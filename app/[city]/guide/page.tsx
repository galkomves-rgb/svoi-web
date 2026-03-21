import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { Card } from "@/components/ui/card";
import { CatalogControlPanel } from "@/features/shared/ui/catalog-control-panel";
import { CatalogEmptyState } from "@/features/shared/ui/catalog-empty-state";
import { GuideEntityCard } from "@/features/guides/guide-entity-card";
import { filterCityGuides, getCityOrThrow, getCityParams, guideCategories, guideCategoryLabels } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

type GuidePageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    category?: string;
    q?: string;
    featured?: string;
    view?: string;
  }>;
};

export default async function GuidePage({ params, searchParams }: GuidePageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedCategory = guideCategories.includes((filters.category ?? "all") as never) ? filters.category ?? "all" : "all";
  const featuredOnly = filters.featured === "1";
  const selectedView = filters.view === "grid" ? "grid" : "list";
  const cityGuides = filterCityGuides(city.slug, {
    category: selectedCategory,
    query: filters.q,
    featuredOnly,
  });

  const makeHref = (next: { category?: string; featured?: boolean; q?: string; view?: "list" | "grid" }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const featured = typeof next.featured === "boolean" ? next.featured : featuredOnly;
    const query = next.q ?? filters.q ?? "";
    const view = next.view ?? selectedView;

    if (category !== "all") params.set("category", category);
    if (featured) params.set("featured", "1");
    if (query) params.set("q", query);
    if (view !== "list") params.set("view", view);

    const queryString = params.toString();
    return queryString ? `/${city.slug}/guide?${queryString}` : `/${city.slug}/guide`;
  };

  return (
    <SiteFrame city={city} currentSection="guide">
      <div className="section-stack">
        <section className="surface-feature p-5 lg:p-6">
          <SectionHeading
            eyebrow="Каталог"
            title="Гід"
            subtitle={`Прості тексти без бюрократії: найважливіше для старту, документів і щоденного життя в ${city.name}.`}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
          <div className="section-stack">
            <CatalogControlPanel
              resultsLabel="Знайдено гідів"
              resultsValue={cityGuides.length}
              clearHref={selectedCategory !== "all" || featuredOnly || Boolean(filters.q) || selectedView !== "list" ? `/${city.slug}/guide` : undefined}
              summary={[
                ...(selectedCategory !== "all" ? [`Категорія: ${guideCategoryLabels[selectedCategory as keyof typeof guideCategoryLabels]}`] : []),
                ...(featuredOnly ? ["Лише ключові"] : []),
                ...(filters.q ? [`Пошук: “${filters.q}”`] : []),
              ]}
              viewLinks={[
                { label: "Список", href: makeHref({ view: "list" }), active: selectedView === "list" },
                { label: "Сітка", href: makeHref({ view: "grid" }), active: selectedView === "grid" },
              ]}
            >
              <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                <label className="grid gap-2">
                  <span className="field-label">Пошук</span>
                  <input
                    type="search"
                    name="q"
                    defaultValue={filters.q ?? ""}
                    placeholder="NIE, житло, лікар, школа..."
                    className="input-shell"
                  />
                </label>
                {selectedCategory !== "all" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
                {featuredOnly ? <input type="hidden" name="featured" value="1" /> : null}
                {selectedView !== "list" ? <input type="hidden" name="view" value={selectedView} /> : null}
                <button type="submit" className="cta-primary self-end">
                  Знайти
                </button>
              </form>

              <div className="grid gap-2">
                <p className="field-label">Категорії</p>
                <div className="flex flex-wrap gap-2">
                  {guideCategories.map((category) => (
                    <a key={category} href={makeHref({ category })} className={selectedCategory === category ? "nav-chip-active" : "nav-chip"}>
                      {guideCategoryLabels[category]}
                    </a>
                  ))}
                  <a href={makeHref({ featured: !featuredOnly })} className={featuredOnly ? "nav-chip-active" : "nav-chip"}>
                    Лише ключові
                  </a>
                </div>
              </div>
            </CatalogControlPanel>

            {cityGuides.length ? (
              <div className={selectedView === "grid" ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
                {cityGuides.map((guide) => (
                  <GuideEntityCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              <CatalogEmptyState
                title="Гіди поки не знайдено"
                description="Спробуйте іншу категорію або вимкніть фільтр ключових матеріалів."
                clearHref={`/${city.slug}/guide`}
              />
            )}
          </div>

          <div className="section-stack">
            <Card as="aside" className="space-y-4 bg-white/78">
              <p className="eyebrow">Роль гіда</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Документи:</strong> зменшують хаос на старті.
                </p>
                <p>
                  <strong className="text-slate-900">Житло:</strong> зшивають guide з listings і practical actions.
                </p>
                <p>
                  <strong className="text-slate-900">Медицина та школа:</strong> підводять до verified services і локальної допомоги.
                </p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4">
              <p className="eyebrow">Що робити далі</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Почніть із ключового guide, а потім переходьте в оголошення, послуги або події.</p>
                <p>Саме цей модуль має стати головним маршрутом для нових користувачів.</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
