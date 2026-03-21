import { ListingCard } from "@/components/listings/listing-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { CatalogControlPanel } from "@/features/shared/ui/catalog-control-panel";
import { CatalogEmptyState } from "@/features/shared/ui/catalog-empty-state";
import { filterCityListings, getCityListings, getCityOrThrow, getCityParams, listingCategories } from "@/lib/site";
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
  const selectedView = query.view === "list" ? "list" : "grid";
  const allCityListings = getCityListings(city.slug);
  const cityListings = filterCityListings(city.slug, {
    category: selectedCategory,
    query: searchQuery,
  });

  const featuredCount = allCityListings.filter((item) => item.featured).length;
  const verifiedCount = allCityListings.filter((item) => item.isVerified).length;

  const makeHref = (next: { category?: string; q?: string; view?: "list" | "grid" }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const search = next.q ?? searchQuery;
    const view = next.view ?? selectedView;

    if (category !== "Усі") params.set("category", category);
    if (search) params.set("q", search);
    if (view !== "grid") params.set("view", view);

    const queryString = params.toString();
    return queryString ? `/${city.slug}/listings?${queryString}` : `/${city.slug}/listings`;
  };

  const hasFilters = Boolean(searchQuery || selectedCategory !== "Усі" || selectedView !== "grid");

  return (
    <SiteFrame city={city} currentSection="listings">
      <div className="section-stack">
        <section className="surface-feature grid gap-4 p-5 lg:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="status-pill">У місті: {allCityListings.length}</span>
            <span className="status-pill">Рекомендовані: {featuredCount}</span>
            <span className="status-pill">Перевірені: {verifiedCount}</span>
          </div>
          <SectionHeading
            eyebrow="Каталог"
            title="Свіжі оголошення"
            subtitle={`Житло, робота та локальні запити в ${city.name}. Спочатку звузьте блок, потім уточніть район, формат або конкретну потребу.`}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)]">
          <div className="section-stack">
            <CatalogControlPanel
              title="Звузьте каталог без зайвих кроків"
              description="Категорія швидко відсікає шум, а пошук допомагає знайти район, формат оголошення або конкретний запит."
              resultsLabel="Знайдено"
              resultsValue={cityListings.length}
              clearHref={hasFilters ? `/${city.slug}/listings` : undefined}
              summary={[
                ...(selectedCategory !== "Усі" ? [`Категорія: ${selectedCategory}`] : []),
                ...(searchQuery ? [`Пошук: “${searchQuery}”`] : []),
              ]}
              secondaryAction={{ label: "Міський гід", href: `/${city.slug}/guide`, variant: "secondary" }}
              primaryAction={{ label: "Додати оголошення", href: "/add/listing", variant: "primary" }}
              viewLinks={[
                { label: "Сітка", href: makeHref({ view: "grid" }), active: selectedView === "grid" },
                { label: "Список", href: makeHref({ view: "list" }), active: selectedView === "list" },
              ]}
            >
              <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                {selectedCategory !== "Усі" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
                {selectedView !== "grid" ? <input type="hidden" name="view" value={selectedView} /> : null}
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
                description="Спробуйте іншу категорію або очистіть пошук, щоб повернути всі локальні оголошення і перейти до потрібної дії швидше."
                clearHref={`/${city.slug}/listings`}
              />
            )}
          </div>

          <div className="section-stack">
            <section className="surface-muted p-5">
              <p className="eyebrow">Швидкі дії</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">Якщо потрібного варіанта немає в каталозі, переходьте в суміжні модулі або подайте власне оголошення.</p>
              <div className="mt-4 grid gap-3">
                <Link href="/add/listing" className="quick-tile block">
                  <p className="text-sm font-semibold text-slate-900">Подати своє оголошення</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Житло, робота, запит на допомогу або локальний пошук контактів.</p>
                </Link>
                <Link href={`/${city.slug}/guide`} className="quick-tile block">
                  <p className="text-sm font-semibold text-slate-900">Перевірити міський гід</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Документи, райони та побутові підказки перед контактом із автором.</p>
                </Link>
                <Link href={`/search?city=${city.slug}&module=listings`} className="quick-tile block">
                  <p className="text-sm font-semibold text-slate-900">Шукати по всій платформі</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Корисно, якщо запит виходить за межі одного міста або змішує кілька модулів.</p>
                </Link>
              </div>
            </section>

            <section className="surface-panel p-5">
              <p className="eyebrow">Перед контактом</p>
              <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">1.</strong> Звірте район, дату публікації й тип автора.
                </p>
                <p>
                  <strong className="text-slate-900">2.</strong> Відкрийте деталі оголошення, щоб уточнити умови, документи й точну адресу.
                </p>
                <p>
                  <strong className="text-slate-900">3.</strong> Якщо пропозиція сумнівна, переходьте в гід або дочекайтесь report flow у модерації.
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
