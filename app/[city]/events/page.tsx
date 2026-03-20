import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { EventEntityCard } from "@/features/events/event-entity-card";
import { eventCategories, eventCategoryLabels, eventTimeLabels, eventTimeScopes, filterCityEvents, getCityOrThrow, getCityParams } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

type EventsPageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    category?: string;
    time?: string;
  }>;
};

export default async function EventsPage({ params, searchParams }: EventsPageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedCategory = eventCategories.includes((filters.category ?? "all") as never) ? filters.category ?? "all" : "all";
  const selectedTime = eventTimeScopes.includes((filters.time ?? "all") as never) ? filters.time ?? "all" : "all";
  const cityEvents = filterCityEvents(city.slug, {
    category: selectedCategory,
    time: selectedTime,
  });

  const makeHref = (next: { category?: string; time?: string }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const time = next.time ?? selectedTime;

    if (category !== "all") params.set("category", category);
    if (time !== "all") params.set("time", time);

    const query = params.toString();
    return query ? `/${city.slug}/events?${query}` : `/${city.slug}/events`;
  };

  return (
    <SiteFrame city={city} currentSection="events">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Події поруч"
            subtitle={`Офлайн-зустрічі та воркшопи для ${city.name}, які будують локальну довіру і повернення на платформу.`}
          />
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              {eventCategories.map((category) => (
                <a
                  key={category}
                  href={makeHref({ category })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category ? "border-blue-900 bg-blue-900 text-white" : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {eventCategoryLabels[category]}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {eventTimeScopes.map((timeScope) => (
                <a
                  key={timeScope}
                  href={makeHref({ time: timeScope })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedTime === timeScope ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {eventTimeLabels[timeScope]}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              Знайдено подій: <span className="font-semibold text-slate-900">{cityEvents.length}</span>
            </p>
            {cityEvents.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {cityEvents.map((event) => (
                  <EventEntityCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <Card as="section" className="space-y-3 rounded-3xl bg-slate-50">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Подій поки не знайдено</h2>
                <p className="text-sm leading-7 text-slate-600">Спробуйте інший тип або часовий діапазон. Далі тут можуть бути recurring formats і promoted events.</p>
                <a href={`/${city.slug}/events`} className="cta-secondary">
                  Очистити фільтри
                </a>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Навіщо цей модуль</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Зустрічі:</strong> дають перший безпечний контакт і довіру офлайн.
                </p>
                <p>
                  <strong className="text-slate-900">Воркшопи:</strong> допомагають вирішити документи, побут і адаптацію.
                </p>
                <p>
                  <strong className="text-slate-900">Нетворк:</strong> переводить платформу з каталогу в живу спільноту.
                </p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4 rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що робити далі</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Відкрийте подію, перевірте організатора і локацію.</p>
                <p>Після події модуль має підштовхувати до guide, services або local contacts.</p>
                <p>Далі тут має з’явитися RSVP та календарні інтеграції.</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
