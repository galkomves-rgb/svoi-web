import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { MapsLink } from "@/features/shared/ui/maps-link";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityOrThrow, getEventOrThrow, getEventParams } from "@/lib/site";

export function generateStaticParams() {
  return getEventParams();
}

export default async function EventDetailPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const event = getEventOrThrow(city.slug, slug);

  return (
    <SiteFrame city={city} currentSection="events">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <Link href={`/${city.slug}/events`} className="text-sm font-medium text-blue-900">
            ← Назад до подій
          </Link>
          <div className="mt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{event.categorySlug}</p>
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
            <p className="text-sm font-medium text-slate-700">
              {new Date(event.startsAt).toLocaleString("uk-UA")}
              {event.endsAt ? ` → ${new Date(event.endsAt).toLocaleString("uk-UA")}` : ""}
            </p>
            <MapsLink
              addressText={event.addressText}
              latitude={event.latitude}
              longitude={event.longitude}
              googlePlaceId={event.googlePlaceId}
            />
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Наступний крок</p>
            <button type="button" className="cta-primary w-full justify-center">
              {event.ctaLabel}
            </button>
          </Card>
        </div>
      </div>
    </SiteFrame>
  );
}
