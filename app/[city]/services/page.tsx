import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
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
  }>;
};

export default async function ServicesPage({ params, searchParams }: ServicesPageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedCategory = serviceCategories.includes((filters.category ?? "all") as never) ? filters.category ?? "all" : "all";
  const selectedAuthor = serviceAuthors.includes((filters.author ?? "all") as never) ? filters.author ?? "all" : "all";
  const verifiedOnly = filters.verified === "1";
  const cityServices = filterCityServices(city.slug, {
    category: selectedCategory,
    author: selectedAuthor,
    query: filters.q,
    verifiedOnly,
  });

  const makeHref = (next: { category?: string; author?: string; verified?: boolean; q?: string }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const author = next.author ?? selectedAuthor;
    const query = next.q ?? filters.q ?? "";
    const verified = typeof next.verified === "boolean" ? next.verified : verifiedOnly;

    if (category && category !== "all") params.set("category", category);
    if (author && author !== "all") params.set("author", author);
    if (query) params.set("q", query);
    if (verified) params.set("verified", "1");

    const queryString = params.toString();
    return queryString ? `/${city.slug}/services?${queryString}` : `/${city.slug}/services`;
  };

  return (
    <SiteFrame city={city} currentSection="services">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Послуги"
            subtitle={`Перевірені контакти, локальні сервіси та бізнеси для української спільноти в ${city.name}.`}
          />
          <div className="mt-6 space-y-4">
            <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Пошук
                <input
                  type="search"
                  name="q"
                  defaultValue={filters.q ?? ""}
                  placeholder="Юрист, лікар, ремонт, переклад..."
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
                />
              </label>
              {selectedCategory !== "all" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
              {selectedAuthor !== "all" ? <input type="hidden" name="author" value={selectedAuthor} /> : null}
              {verifiedOnly ? <input type="hidden" name="verified" value="1" /> : null}
              <button type="submit" className="cta-primary self-end">
                Знайти
              </button>
            </form>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {serviceCategories.map((category) => (
                  <a
                    key={category}
                    href={makeHref({ category })}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedCategory === category ? "border-blue-900 bg-blue-900 text-white" : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {serviceCategoryLabels[category]}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {serviceAuthors.map((author) => (
                  <a
                    key={author}
                    href={makeHref({ author })}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      selectedAuthor === author ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {serviceAuthorLabels[author]}
                  </a>
                ))}
                <a
                  href={makeHref({ verified: !verifiedOnly })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    verifiedOnly ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  Лише перевірені
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              Знайдено: <span className="font-semibold text-slate-900">{cityServices.length}</span>
            </p>
            {cityServices.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {cityServices.map((service) => (
                  <ServiceEntityCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <Card as="section" className="space-y-3 rounded-3xl bg-slate-50">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Поки нічого не знайдено</h2>
                <p className="text-sm leading-7 text-slate-600">Спробуйте іншу категорію, вимкніть фільтр перевірених або змініть пошуковий запит.</p>
                <a href={`/${city.slug}/services`} className="cta-secondary">
                  Очистити фільтри
                </a>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Довіра і статус</p>
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

            <Card as="aside" className="space-y-4 rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що робити далі</p>
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
