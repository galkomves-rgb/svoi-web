import { ListingCard } from "@/components/listings/listing-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { CatalogControlPanel } from "@/features/shared/ui/catalog-control-panel";
import { CatalogEmptyState } from "@/features/shared/ui/catalog-empty-state";
import { getCityOrThrow, getCityParams, filterCityListings, listingCategories } from "@/lib/site";
import Link from "next/link";

type ListingsPageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ category?: string; q?: string; view?: string }>;
};

export function generateStaticParams() {
  return getCityParams();
}

export default async function ListingsPage({ params, searchParams }: ListingsPageProps) {
  const [{ city: citySlug }, query] = await Promise.all([params, searchParams]);
  const city = getCityOrThrow(citySlug);
  const selectedCategory = query.category || "Усі";
  const searchQuery = query.q || "";
  const selectedView = query.view === "grid" ? "grid" : "list";
  const cityListings = filterCityListings(city.slug, {
    category: selectedCategory,
    query: searchQuery,
  });

  const makeHref = (next: { category?: string; q?: string; view?: "list" | "grid" }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const search = next.q ?? searchQuery;
    const view = next.view ?? selectedView;

    if (category !== "Усі") params.set("category", category);
    if (search) params.set("q", search);
    if (view !== "list") params.set("view", view);

    const queryString = params.toString();
    return queryString ? `/${city.slug}/listings?${queryString}` : `/${city.slug}/listings`;
  };

  const hasFilters = Boolean(searchQuery || selectedCategory !== "Усі" || selectedView !== "list");

  return (
    <SiteFrame city={city} currentSection="listings">
      <div className="section-stack">
        <section className="surface-feature p-5 lg:p-6">
          <SectionHeading
            eyebrow="Каталог"
            title="Свіжі оголошення"
            subtitle={`Практичні listings для ${city.name}: житло, робота та послуги без перевантаження інтерфейсу.`}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
          <div className="section-stack">
            <CatalogControlPanel
              resultsLabel="Знайдено"
              resultsValue={cityListings.length}
              clearHref={hasFilters ? `/${city.slug}/listings` : undefined}
              summary={[
                ...(selectedCategory !== "Усі" ? [`Категорія: ${selectedCategory}`] : []),
                ...(searchQuery ? [`Пошук: “${searchQuery}”`] : []),
              ]}
              viewLinks={[
                { label: "Список", href: makeHref({ view: "list" }), active: selectedView === "list" },
                { label: "Сітка", href: makeHref({ view: "grid" }), active: selectedView === "grid" },
              ]}
            >
              <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                {selectedCategory !== "Усі" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
                {selectedView !== "list" ? <input type="hidden" name="view" value={selectedView} /> : null}
                <label className="grid gap-2">
                  <span className="field-label">Пошук</span>
                  <input
                    type="search"
                    name="q"
                    defaultValue={searchQuery}
                    placeholder="Житло, робота, документи, район..."
                    className="input-shell"
                  />
                </label>
                <button type="submit" className="cta-primary self-end">
                  Знайти
                </button>
              </form>

              <div className="grid gap-2">
                <p className="field-label">Категорії</p>
                <div className="flex flex-wrap gap-2">
                  {listingCategories.map((category) => (
                    <Link key={category} href={makeHref({ category })} className={selectedCategory === category ? "nav-chip-active" : "nav-chip"}>
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </CatalogControlPanel>

            {cityListings.length ? (
              <section className={selectedView === "grid" ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
                {cityListings.map((item) => (
                  <ListingCard key={item.id} citySlug={city.slug} listing={item} />
                ))}
              </section>
            ) : (
              <CatalogEmptyState
                title="Нічого не знайдено"
                description="Спробуйте іншу категорію або очистіть пошук, щоб побачити всі локальні оголошення."
                clearHref={`/${city.slug}/listings`}
              />
            )}
          </div>

          <div className="section-stack">
            <section className="surface-muted p-5">
              <p className="eyebrow">Як працює каталог</p>
              <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-600">
                <p>Фільтри працюють як робочий інструмент: спочатку звузьте категорію, потім уточніть запитом.</p>
                <p>Список підходить для швидкого читання, сітка — коли хочеться бачити більше сутностей на екрані.</p>
              </div>
            </section>

            <section className="surface-panel p-5">
              <p className="eyebrow">Що далі</p>
              <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-600">
                <p>Далі цей модуль має отримати sticky secondary filters, report flow і promoted placements без втрати простоти.</p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
