import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { getCityEvents, getCityOrThrow, getCityParams } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

export default async function EventsPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);
  const cityEvents = getCityEvents(city.slug);

  return (
    <SiteFrame city={city} currentSection="events">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Події поруч"
            subtitle={`Офлайн-зустрічі та воркшопи для ${city.name}, які будують локальну довіру і повернення на платформу.`}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {cityEvents.map((event) => (
            <Card key={event.id} as="article" className="space-y-4 rounded-3xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{event.type}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{event.title}</h2>
                </div>
                <span className="text-sm text-slate-500">{event.date}</span>
              </div>
              <p className="text-sm leading-7 text-slate-600">{event.description}</p>
              <button type="button" className="cta-secondary">
                Піти на подію
              </button>
            </Card>
          ))}
        </section>
      </div>
    </SiteFrame>
  );
}
