import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { CatalogControlPanel } from "@/features/shared/ui/catalog-control-panel";
import { CatalogEmptyState } from "@/features/shared/ui/catalog-empty-state";
import { ServiceEntityCard } from "@/features/services/service-entity-card";
import {
  filterCityServices,
  getCityOrThrow,
  getCityParams,
  serviceAuthorLabels,
  serviceAuthors,
  serviceCategories,
  serviceCategoryLabels,
} from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

type ServicesPageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    category?: string;
    author?: string;
    q?: string;
    verified?: string;
    view?: string;
  }>;
};

export default async function ServicesPage({ params, searchParams }: ServicesPageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedCategory = serviceCategories.includes((filters.category ?? "all") as never) ? filters.category ?? "all" : "all";
  const selectedAuthor = serviceAuthors.includes((filters.author ?? "all") as never) ? filters.author ?? "all" : "all";
  const verifiedOnly = filters.verified === "1";
  const selectedView = filters.view === "list" ? "list" : "grid";
  const cityServices = filterCityServices(city.slug, {
    category: selectedCategory,
    author: selectedAuthor,
    query: filters.q,
    verifiedOnly,
  });

  const makeHref = (next: { category?: string; author?: string; verified?: boolean; q?: string; view?: "list" | "grid" }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const author = next.author ?? selectedAuthor;
    const query = next.q ?? filters.q ?? "";
    const verified = typeof next.verified === "boolean" ? next.verified : verifiedOnly;
    const view = next.view ?? selectedView;

    if (category && category !== "all") params.set("category", category);
    if (author && author !== "all") params.set("author", author);
    if (query) params.set("q", query);
    if (verified) params.set("verified", "1");
    if (view !== "grid") params.set("view", view);

    const queryString = params.toString();
    return queryString ? `/${city.slug}/services?${queryString}` : `/${city.slug}/services`;
  };

  return (
    <SiteFrame city={city} currentSection="services">
      <div className="section-stack">
        <section className="surface-feature p-5 lg:p-6">
          <SectionHeading
            eyebrow="Каталог"
            title="Послуги"
            subtitle={`Перевірені контакти, локальні сервіси та бізнеси для української спільноти в ${city.name}.`}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
          <div className="section-stack">
            <CatalogControlPanel
              resultsLabel="Знайдено"
              resultsValue={cityServices.length}
              clearHref={selectedCategory !== "all" || selectedAuthor !== "all" || verifiedOnly || Boolean(filters.q) || selectedView !== "grid" ? `/${city.slug}/services` : undefined}
              summary={[
                ...(selectedCategory !== "all" ? [`Категорія: ${serviceCategoryLabels[selectedCategory as keyof typeof serviceCategoryLabels]}`] : []),
                ...(selectedAuthor !== "all" ? [`Автор: ${serviceAuthorLabels[selectedAuthor as keyof typeof serviceAuthorLabels]}`] : []),
                ...(verifiedOnly ? ["Лише перевірені"] : []),
              ]}
              viewLinks={[
                { label: "Сітка", href: makeHref({ view: "grid" }), active: selectedView === "grid" },
                { label: "Список", href: makeHref({ view: "list" }), active: selectedView === "list" },
              ]}
            >
              <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                <label className="grid gap-2">
                  <span className="field-label">Пошук</span>
                  <input
                    type="search"
                    name="q"
                    defaultValue={filters.q ?? ""}
                    placeholder="Юрист, лікар, ремонт, переклад..."
                    className="input-shell"
                  />
                </label>
                {selectedCategory !== "all" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
                {selectedAuthor !== "all" ? <input type="hidden" name="author" value={selectedAuthor} /> : null}
                {verifiedOnly ? <input type="hidden" name="verified" value="1" /> : null}
                {selectedView !== "grid" ? <input type="hidden" name="view" value={selectedView} /> : null}
                <button type="submit" className="cta-primary self-end">
                  Знайти
                </button>
              </form>

              <div className="grid gap-3">
                <div className="grid gap-2">
                  <p className="field-label">Категорії</p>
                  <div className="flex flex-wrap gap-2">
                    {serviceCategories.map((category) => (
                      <a key={category} href={makeHref({ category })} className={selectedCategory === category ? "nav-chip-active" : "nav-chip"}>
                        {serviceCategoryLabels[category]}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <p className="field-label">Джерело</p>
                  <div className="flex flex-wrap gap-2">
                    {serviceAuthors.map((author) => (
                      <a key={author} href={makeHref({ author })} className={selectedAuthor === author ? "nav-chip-active" : "nav-chip"}>
                        {serviceAuthorLabels[author]}
                      </a>
                    ))}
                    <a href={makeHref({ verified: !verifiedOnly })} className={verifiedOnly ? "nav-chip-active" : "nav-chip"}>
                      Лише перевірені
                    </a>
                  </div>
                </div>
              </div>
            </CatalogControlPanel>

            {cityServices.length ? (
              <div className={selectedView === "grid" ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
                {cityServices.map((service) => (
                  <ServiceEntityCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <CatalogEmptyState
                title="Поки нічого не знайдено"
                description="Спробуйте іншу категорію, вимкніть фільтр перевірених або змініть пошуковий запит."
                clearHref={`/${city.slug}/services`}
              />
            )}
          </div>

          <div className="section-stack">
            <Card as="aside" className="space-y-4 bg-white/78">
              <p className="eyebrow">Довіра і статус</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Бізнес:</strong> комерційний сервіс із профілем або локальною діяльністю.
                </p>
                <p>
                  <strong className="text-slate-900">Організація:</strong> community або support-ініціатива без класичного бізнес-профілю.
                </p>
                <p>
                  <strong className="text-slate-900">Перевірено:</strong> сервіс має додатковий trust-signal і проходить ручну перевірку.
                </p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4">
              <p className="eyebrow">Що робити далі</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Відкрийте профіль сервісу, перевірте статус і спосіб контакту.</p>
                <p>Для документів і побутових задач звіряйте сервіс із гідом міста.</p>
                <p>Якщо контакт підозрілий, далі має бути report flow через moderation.</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
