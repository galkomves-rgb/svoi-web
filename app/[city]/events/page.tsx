import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { EventEntityCard } from "@/features/events/event-entity-card";
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
            <EventEntityCard key={event.id} event={event} />
          ))}
        </section>
      </div>
    </SiteFrame>
  );
}
