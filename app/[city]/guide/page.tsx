import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { Card } from "@/components/ui/card";
import { GuideEntityCard } from "@/features/guides/guide-entity-card";
import { filterCityGuides, getCityOrThrow, getCityParams, guideCategories, guideCategoryLabels } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);
  return {
    title: `Гід — ${city.name}`,
    description: `Практичний гід для новоприбулих українців у ${city.name}: документи, житло, лікар, школа.`,
  };
}

type GuidePageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    category?: string;
    q?: string;
    featured?: string;
  }>;
};

export default async function GuidePage({ params, searchParams }: GuidePageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedCategory = guideCategories.includes((filters.category ?? "all") as never) ? filters.category ?? "all" : "all";
  const featuredOnly = filters.featured === "1";
  const cityGuides = filterCityGuides(city.slug, {
    category: selectedCategory,
    query: filters.q,
    featuredOnly,
  });

  const makeHref = (next: { category?: string; featured?: boolean; q?: string }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const featured = typeof next.featured === "boolean" ? next.featured : featuredOnly;
    const query = next.q ?? filters.q ?? "";

    if (category !== "all") params.set("category", category);
    if (featured) params.set("featured", "1");
    if (query) params.set("q", query);

    const queryString = params.toString();
    return queryString ? `/${city.slug}/guide?${queryString}` : `/${city.slug}/guide`;
  };

  return (
    <SiteFrame city={city} currentSection="guide">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Гід"
            subtitle={`Прості тексти без бюрократії: найважливіше для старту, документів і щоденного життя в ${city.name}.`}
          />
          <div className="mt-6 space-y-4">
            <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Пошук
                <input
                  type="search"
                  name="q"
                  defaultValue={filters.q ?? ""}
                  placeholder="NIE, житло, лікар, школа..."
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400"
                />
              </label>
              {selectedCategory !== "all" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
              {featuredOnly ? <input type="hidden" name="featured" value="1" /> : null}
              <button type="submit" className="cta-primary self-end">
                Знайти
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {guideCategories.map((category) => (
                <a
                  key={category}
                  href={makeHref({ category })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category ? "border-blue-900 bg-blue-900 text-white" : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {guideCategoryLabels[category]}
                </a>
              ))}
              <a
                href={makeHref({ featured: !featuredOnly })}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  featuredOnly ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                Лише ключові
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              Знайдено гідів: <span className="font-semibold text-slate-900">{cityGuides.length}</span>
            </p>
            {cityGuides.length ? (
              <div className="grid gap-4">
                {cityGuides.map((guide) => (
                  <GuideEntityCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              <Card as="section" className="space-y-3 rounded-3xl bg-slate-50">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Гіди поки не знайдено</h2>
                <p className="text-sm leading-7 text-slate-600">Спробуйте іншу категорію або вимкніть фільтр ключових матеріалів.</p>
                <a href={`/${city.slug}/guide`} className="cta-secondary">
                  Очистити фільтри
                </a>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Роль гіда</p>
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

            <Card as="aside" className="space-y-4 rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що робити далі</p>
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
