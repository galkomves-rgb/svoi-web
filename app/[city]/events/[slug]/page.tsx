import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { EventEntityCard } from "@/features/events/event-entity-card";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { MapsLink } from "@/features/shared/ui/maps-link";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { formatEventDateRange, getCityOrThrow, getEventCategoryLabel, getEventOrThrow, getEventParams, getRelatedEvents } from "@/lib/site";

export function generateStaticParams() {
  return getEventParams();
}

export default async function EventDetailPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const event = getEventOrThrow(city.slug, slug);
  const relatedEvents = getRelatedEvents(city.slug, slug, 2);

  return (
    <SiteFrame city={city} currentSection="events">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <Link href={`/${city.slug}/events`} className="text-sm font-medium text-blue-900">
            ← Назад до подій
          </Link>
          <div className="mt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{getEventCategoryLabel(event.categorySlug)}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{event.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">{event.summary}</p>
            <AuthorBadge authorType={event.authorType} verified={event.isVerified} />
            <StatusBadge status={event.status} visibility={event.visibility} featured={event.featured} />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_340px]">
          <Card as="section" className="space-y-5 rounded-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Деталі події</h2>
            <p className="text-sm leading-8 text-slate-700">{event.body}</p>
            <p className="text-sm font-medium text-slate-700">{formatEventDateRange(event.startsAt, event.endsAt)}</p>
            <MapsLink
              addressText={event.addressText}
              latitude={event.latitude}
              longitude={event.longitude}
              googlePlaceId={event.googlePlaceId}
            />
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Наступний крок</p>
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>
                <strong className="text-slate-900">Коли:</strong> {formatEventDateRange(event.startsAt, event.endsAt)}
              </p>
              {event.addressText ? (
                <p>
                  <strong className="text-slate-900">Де:</strong> {event.addressText}
                </p>
              ) : null}
              <p>Після цієї події логічний next step: local contacts, guide або practical services.</p>
            </div>
            <button type="button" className="cta-primary w-full justify-center">
              {event.ctaLabel}
            </button>
          </Card>
        </div>

        {relatedEvents.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Схожі події поруч</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedEvents.map((item) => (
                <EventEntityCard key={item.id} event={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </SiteFrame>
  );
}
