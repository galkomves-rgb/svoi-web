import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { MapsLink } from "@/features/shared/ui/maps-link";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityOrThrow, getListingCategoryLabel, getListingOrThrow, getListingParams } from "@/lib/site";

type ListingDetailPageProps = {
  params: Promise<{ city: string; slug: string }>;
};

export function generateStaticParams() {
  return getListingParams();
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const listing = getListingOrThrow(city.slug, slug);

  return (
    <SiteFrame city={city} currentSection="listings">
      <div className="space-y-6">
        <section className="surface-section p-6 lg:p-8">
          <Link href={`/${city.slug}/listings`} className="text-sm font-medium text-blue-900">
            ← Назад до оголошень
          </Link>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-4">
              <p className="eyebrow">{getListingCategoryLabel(listing.categorySlug)}</p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{listing.title}</h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">{listing.summary}</p>
              <AuthorBadge authorType={listing.authorType} verified={listing.isVerified} />
              <StatusBadge status={listing.status} visibility={listing.visibility} featured={listing.featured} />
            </div>
            {listing.priceLabel ? <div className="text-right text-lg font-semibold text-slate-900">{listing.priceLabel}</div> : null}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_340px]">
          <Card as="section" className="space-y-5 rounded-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Деталі</h2>
            <p className="text-sm leading-8 text-slate-700">{listing.body}</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">{city.name}</span>
              {listing.districtSlug ? (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">{listing.districtSlug}</span>
              ) : null}
              {listing.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
            <MapsLink
              addressText={listing.addressText}
              latitude={listing.latitude}
              longitude={listing.longitude}
              googlePlaceId={listing.googlePlaceId}
            />
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="eyebrow">Швидка перевірка</p>
            <div className="flex flex-wrap gap-2">
              <span className="status-pill">{city.name}</span>
              {listing.districtSlug ? <span className="status-pill">{listing.districtSlug}</span> : null}
              {listing.priceLabel ? <span className="status-pill bg-blue-100 text-blue-900">{listing.priceLabel}</span> : null}
            </div>
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>1. Перевірте статус автора, район і дату публікації.</p>
              <p>2. Звірте деталі, карту й умови перед першим повідомленням.</p>
              <p>3. Якщо запит уже неактуальний, поверніться в каталог або подайте свій варіант.</p>
            </div>
            <div className="grid gap-2">
              <button type="button" className="cta-primary w-full justify-center">
                Звʼязатися
              </button>
              <Link href={`/${city.slug}/listings`} className="cta-secondary w-full justify-center">
                Повернутися до каталогу
              </Link>
              <Link href="/add/listing" className="cta-secondary w-full justify-center">
                Подати схоже оголошення
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </SiteFrame>
  );
}
