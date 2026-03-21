import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { PreviewSection } from "@/components/home/preview-section";
import { QuickActions } from "@/components/home/quick-actions";
import { ListingCard } from "@/components/listings/listing-card";
import { SiteFrame } from "@/components/layout/site-frame";
import { EventEntityCard } from "@/features/events/event-entity-card";
import { events } from "@/data/events";
import { listings } from "@/data/listings";
import { cities } from "@/data/cities";
import { pagesUi } from "@/lib/i18n/pages";

export default function HomePage() {
  return (
    <SiteFrame>
      <div className="section-stack">
        <Hero
          eyebrow={pagesUi.home.hero.eyebrow}
          title={pagesUi.home.hero.title}
          lead={pagesUi.home.hero.lead}
          primary={{ label: pagesUi.home.hero.primaryLabel, href: "/start" }}
        />

        <section className="surface-muted p-5 lg:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">{pagesUi.home.cityContext.eyebrow}</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">{pagesUi.home.cityContext.title}</h2>
            </div>
            <p className="text-sm leading-7 text-slate-600">{pagesUi.home.cityContext.subtitle}</p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="quick-tile block"
              >
                <p className="text-base font-semibold text-slate-900">{city.name}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{city.region}, {city.country}</p>
              </Link>
            ))}
          </div>
        </section>

        <QuickActions
          title={pagesUi.home.quickActionsTitle}
          actions={pagesUi.home.quickActions}
        />

        <div className="grid gap-5 xl:grid-cols-2">
          <PreviewSection
            eyebrow={pagesUi.home.listingsPreview.eyebrow}
            title={pagesUi.home.listingsPreview.title}
            subtitle={pagesUi.home.listingsPreview.subtitle}
            actionLabel={pagesUi.home.listingsPreview.actionLabel}
            actionHref={pagesUi.home.listingsPreview.actionHref}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {listings.slice(0, 3).map((item) => (
                <ListingCard key={item.id} citySlug={item.citySlug} listing={item} />
              ))}
            </div>
          </PreviewSection>

          <PreviewSection
            eyebrow={pagesUi.home.eventsPreview.eyebrow}
            title={pagesUi.home.eventsPreview.title}
            subtitle={pagesUi.home.eventsPreview.subtitle}
            actionLabel={pagesUi.home.eventsPreview.actionLabel}
            actionHref={pagesUi.home.eventsPreview.actionHref}
            muted
          >
            <div className="grid gap-4 md:grid-cols-2">
              {events.slice(0, 3).map((event) => (
                <EventEntityCard key={event.id} event={event} />
              ))}
            </div>
          </PreviewSection>
        </div>
      </div>
    </SiteFrame>
  );
}
