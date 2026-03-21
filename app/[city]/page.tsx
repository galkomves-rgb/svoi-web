import Link from "next/link";
import { PreviewSection } from "@/components/home/preview-section";
import { QuickActions } from "@/components/home/quick-actions";
import { Card } from "@/components/ui/card";
import { ListingCard } from "@/components/listings/listing-card";
import { SiteFrame } from "@/components/layout/site-frame";
import { EventEntityCard } from "@/features/events/event-entity-card";
import { RealEstateCard } from "@/features/real-estate/real-estate-card";
import { pagesUi } from "@/lib/i18n/pages";
import { getCityEvents, getCityGuides, getCityListings, getCityOrThrow, getCityParams, getCityRealEstate } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);
  const cityListings = getCityListings(city.slug, 3);
  const cityRealEstate = getCityRealEstate(city.slug, 2);
  const cityEvents = getCityEvents(city.slug, 2);
  const cityGuides = getCityGuides(city.slug, 2);

  return (
    <SiteFrame city={city} currentSection="overview">
      <div className="section-stack">
        <section className="surface-feature p-5 lg:p-6">
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">{pagesUi.city.heroEyebrow(city.name)}</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-[2.4rem]">{pagesUi.city.heroTitle(city.name)}</h1>
            <p className="text-base leading-7 text-slate-600 lg:text-lg">{city.heroLead}</p>
          </div>
        </section>

        <QuickActions
          title={pagesUi.city.quickActionsTitle}
          actions={pagesUi.city.quickActions.map((action) => ({
            title: action.title,
            description: action.description,
            href: `/${city.slug}${action.path}`,
            icon: action.icon,
          }))}
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.85fr)_minmax(300px,1fr)]">
          <div className="section-stack">
            <PreviewSection
              eyebrow={pagesUi.city.listingsPreview.eyebrow}
              title={pagesUi.city.listingsPreview.title}
              actionLabel={pagesUi.city.listingsPreview.actionLabel}
              actionHref={`/${city.slug}/listings`}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {cityListings.map((item) => (
                  <ListingCard key={item.id} citySlug={city.slug} listing={item} />
                ))}
              </div>
            </PreviewSection>

            <PreviewSection
              eyebrow={pagesUi.city.realEstatePreview.eyebrow}
              title={pagesUi.city.realEstatePreview.title}
              actionLabel={pagesUi.city.realEstatePreview.actionLabel}
              actionHref={`/${city.slug}/real-estate`}
              muted
            >
              <div className="grid gap-4 md:grid-cols-2">
                {cityRealEstate.map((item) => (
                  <RealEstateCard key={item.id} citySlug={city.slug} item={item} />
                ))}
              </div>
            </PreviewSection>
          </div>

          <div className="section-stack">
            <PreviewSection
              eyebrow={pagesUi.city.eventsPreview.eyebrow}
              title={pagesUi.city.eventsPreview.title}
              actionLabel={pagesUi.city.eventsPreview.actionLabel}
              actionHref={`/${city.slug}/events`}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {cityEvents.map((event) => (
                  <EventEntityCard key={event.id} event={event} />
                ))}
              </div>
            </PreviewSection>

            <Card as="section" className="space-y-4 bg-white/78">
              <p className="eyebrow">{pagesUi.city.onboarding.eyebrow}</p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">{pagesUi.city.onboarding.title(city.name)}</h2>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                {cityGuides.map((guide) => (
                  <li key={guide.id}>
                    <strong className="block text-slate-900">{guide.title}</strong>
                    <span>{guide.summary}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/${city.slug}/guide`} className="cta-secondary">
                {pagesUi.city.onboarding.openGuide}
              </Link>
            </Card>

            <Card as="section" className="space-y-4">
              <p className="eyebrow">{pagesUi.city.localFocus.eyebrow}</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">{pagesUi.city.localFocus.listingsLead}</strong> {pagesUi.city.localFocus.listingsText}
                </p>
                <p>
                  <strong className="text-slate-900">{pagesUi.city.localFocus.eventsLead}</strong> {pagesUi.city.localFocus.eventsText}
                </p>
                <p>
                  <strong className="text-slate-900">{pagesUi.city.localFocus.guideLead}</strong> {pagesUi.city.localFocus.guideText}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
