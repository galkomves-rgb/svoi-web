import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { CatalogControlPanel } from "@/features/shared/ui/catalog-control-panel";
import { CatalogEmptyState } from "@/features/shared/ui/catalog-empty-state";
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
    view?: string;
  }>;
};

export default async function EventsPage({ params, searchParams }: EventsPageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedCategory = eventCategories.includes((filters.category ?? "all") as never) ? filters.category ?? "all" : "all";
  const selectedTime = eventTimeScopes.includes((filters.time ?? "all") as never) ? filters.time ?? "all" : "all";
  const selectedView = filters.view === "list" ? "list" : "grid";
  const cityEvents = filterCityEvents(city.slug, {
    category: selectedCategory,
    time: selectedTime,
  });

  const makeHref = (next: { category?: string; time?: string; view?: "list" | "grid" }) => {
    const params = new URLSearchParams();
    const category = next.category ?? selectedCategory;
    const time = next.time ?? selectedTime;
    const view = next.view ?? selectedView;

    if (category !== "all") params.set("category", category);
    if (time !== "all") params.set("time", time);
    if (view !== "grid") params.set("view", view);

    const query = params.toString();
    return query ? `/${city.slug}/events?${query}` : `/${city.slug}/events`;
  };

  return (
    <SiteFrame city={city} currentSection="events">
      <div className="section-stack">
        <section className="surface-feature p-5 lg:p-6">
          <SectionHeading
            eyebrow="Каталог"
            title="Події поруч"
            subtitle={`Офлайн-зустрічі та воркшопи для ${city.name}, які будують локальну довіру і повернення на платформу.`}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
          <div className="section-stack">
            <CatalogControlPanel
              resultsLabel="Знайдено подій"
              resultsValue={cityEvents.length}
              clearHref={selectedCategory !== "all" || selectedTime !== "all" || selectedView !== "grid" ? `/${city.slug}/events` : undefined}
              summary={[
                ...(selectedCategory !== "all" ? [`Тип: ${eventCategoryLabels[selectedCategory as keyof typeof eventCategoryLabels]}`] : []),
                ...(selectedTime !== "all" ? [`Час: ${eventTimeLabels[selectedTime as keyof typeof eventTimeLabels]}`] : []),
              ]}
              viewLinks={[
                { label: "Сітка", href: makeHref({ view: "grid" }), active: selectedView === "grid" },
                { label: "Список", href: makeHref({ view: "list" }), active: selectedView === "list" },
              ]}
            >
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <p className="field-label">Тип події</p>
                  <div className="flex flex-wrap gap-2">
                    {eventCategories.map((category) => (
                      <a key={category} href={makeHref({ category })} className={selectedCategory === category ? "nav-chip-active" : "nav-chip"}>
                        {eventCategoryLabels[category]}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <p className="field-label">Час</p>
                  <div className="flex flex-wrap gap-2">
                    {eventTimeScopes.map((timeScope) => (
                      <a key={timeScope} href={makeHref({ time: timeScope })} className={selectedTime === timeScope ? "nav-chip-active" : "nav-chip"}>
                        {eventTimeLabels[timeScope]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CatalogControlPanel>

            {cityEvents.length ? (
              <div className={selectedView === "grid" ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
                {cityEvents.map((event) => (
                  <EventEntityCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <CatalogEmptyState
                title="Подій поки не знайдено"
                description="Спробуйте інший тип або часовий діапазон. Далі тут можуть бути recurring formats і promoted events."
                clearHref={`/${city.slug}/events`}
              />
            )}
          </div>

          <div className="section-stack">
            <Card as="aside" className="space-y-4 bg-white/78">
              <p className="eyebrow">Навіщо цей модуль</p>
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

            <Card as="aside" className="space-y-4">
              <p className="eyebrow">Що робити далі</p>
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
