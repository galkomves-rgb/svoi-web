import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { getCityOrThrow, getListingOrThrow, getListingParams } from "@/lib/site";

type ListingDetailPageProps = {
  params: Promise<{ city: string; listingId: string }>;
};

export function generateStaticParams() {
  return getListingParams();
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { city: citySlug, listingId } = await params;
  const city = getCityOrThrow(citySlug);
  const listing = getListingOrThrow(city.slug, listingId);

  return (
    <SiteFrame city={city} currentSection="listings">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <Link href={`/${city.slug}/listings`} className="text-sm font-medium text-blue-900">
            ← Назад до оголошень
          </Link>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{listing.category}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{listing.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{listing.description}</p>
            </div>
            {listing.priceLabel ? <div className="text-right text-lg font-semibold text-slate-900">{listing.priceLabel}</div> : null}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_340px]">
          <Card as="section" className="space-y-5 rounded-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Деталі</h2>
            <p className="text-sm leading-8 text-slate-700">{listing.details}</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">{city.name}</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">{listing.district}</span>
              {listing.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що робити далі</p>
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>1. Перевір точне місце, дату та умови.</p>
              <p>2. Уточни, які документи або підтвердження потрібні.</p>
              <p>3. Переходь до контакту тільки після перевірки деталей.</p>
            </div>
            <button type="button" className="cta-primary w-full justify-center">
              Звʼязатися
            </button>
          </Card>
        </div>
      </div>
    </SiteFrame>
  );
}
