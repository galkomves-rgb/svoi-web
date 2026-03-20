import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { SectionHeading } from "@/components/ui/section-heading";
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
  const items = filterCityRealEstate(city.slug, {
    category: query.category,
    sourceType: query.source,
  });

  return (
    <SiteFrame city={city} currentSection="real-estate">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Нерухомість"
            subtitle={`Окремий шар для житла в ${city.name}: оренда, продаж, запити та пошук співмешканців без змішування з усіма оголошеннями.`}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_320px]">
          <div className="space-y-4">
            <Card className="space-y-4 rounded-3xl">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">Тип пропозиції</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(realEstateCategoryLabels).map(([value, label]) => {
                    const href = value === "all" ? `/${city.slug}/real-estate` : `/${city.slug}/real-estate?category=${value}${query.source ? `&source=${query.source}` : ""}`;
                    const active = (query.category ?? "all") === value;
                    return (
                      <a key={value} href={href} className={active ? "nav-pill-active" : "nav-pill"}>
                        {label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-900">Джерело</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(sourceLabels).map(([value, label]) => {
                    const href = value === "all" ? `/${city.slug}/real-estate${query.category ? `?category=${query.category}` : ""}` : `/${city.slug}/real-estate?source=${value}${query.category ? `&category=${query.category}` : ""}`;
                    const active = (query.source ?? "all") === value;
                    return (
                      <a key={value} href={href} className={active ? "nav-pill-active" : "nav-pill"}>
                        {label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </Card>

            <p className="text-sm font-medium text-slate-600">
              Обʼєктів: <span className="font-semibold text-slate-900">{items.length}</span>
            </p>

            {items.length ? (
              <div className="grid gap-4">
                {items.map((item) => (
                  <RealEstateCard key={item.id} citySlug={city.slug} item={item} />
                ))}
              </div>
            ) : (
              <Card className="rounded-3xl bg-slate-50">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Поки порожньо</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">Спробуйте змінити тип пропозиції або джерело. Модуль нерухомості повинен залишатися чистим і структурованим.</p>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Навіщо окремий модуль</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Не змішуємо житло:</strong> пошук квартири чи кімнати не губиться серед роботи та побутових запитів.
                </p>
                <p>
                  <strong className="text-slate-900">Бізнес vs приватні:</strong> агентства й приватні власники читаються як різні джерела.
                </p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4 rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що далі</p>
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
