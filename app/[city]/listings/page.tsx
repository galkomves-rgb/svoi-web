import { ListingCard } from "@/components/listings/listing-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { getCityOrThrow, getCityParams, filterCityListings, listingCategories } from "@/lib/site";
import Link from "next/link";

type ListingsPageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ category?: string; q?: string }>;
};

export function generateStaticParams() {
  return getCityParams();
}

export default async function ListingsPage({ params, searchParams }: ListingsPageProps) {
  const [{ city: citySlug }, query] = await Promise.all([params, searchParams]);
  const city = getCityOrThrow(citySlug);
  const selectedCategory = query.category || "Усі";
  const searchQuery = query.q || "";
  const cityListings = filterCityListings(city.slug, {
    category: selectedCategory,
    query: searchQuery,
  });

  return (
    <SiteFrame city={city} currentSection="listings">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Свіжі оголошення"
            subtitle={`Практичні listings для ${city.name}: житло, робота та послуги без перевантаження інтерфейсу.`}
          />

          <div className="mt-6 space-y-4">
            <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
              {selectedCategory !== "Усі" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Пошук</span>
                <input
                  type="search"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Житло, робота, документи, район..."
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
                />
              </label>
              <button type="submit" className="cta-primary self-end">
                Знайти
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {listingCategories.map((category) => {
                  const href =
                    category === "Усі"
                      ? `/${city.slug}/listings${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`
                      : `/${city.slug}/listings?category=${encodeURIComponent(category)}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ""}`;

                  return (
                    <Link
                      key={category}
                      href={href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        selectedCategory === category
                          ? "bg-blue-900 text-white"
                          : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>

              {(searchQuery || selectedCategory !== "Усі") ? (
                <Link href={`/${city.slug}/listings`} className="text-sm font-medium text-slate-500 hover:text-slate-900">
                  Очистити фільтри
                </Link>
              ) : null}
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Знайдено: <strong className="text-slate-900">{cityListings.length}</strong>
              {selectedCategory !== "Усі" ? ` • категорія: ${selectedCategory}` : ""}
              {searchQuery ? ` • пошук: “${searchQuery}”` : ""}
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {cityListings.length ? (
            cityListings.map((item) => <ListingCard key={item.id} citySlug={city.slug} listing={item} />)
          ) : (
            <section className="rounded-3xl border border-dashed border-slate-300 bg-white/90 p-8 text-center shadow-soft">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Нічого не знайдено</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Спробуй іншу категорію або очисть пошук, щоб побачити всі локальні оголошення.
              </p>
            </section>
          )}
        </section>
      </div>
    </SiteFrame>
  );
}
