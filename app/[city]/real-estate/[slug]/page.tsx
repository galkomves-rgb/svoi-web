import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { RealEstateCard } from "@/features/real-estate/real-estate-card";
import { buildRouteUrl, MapsLink } from "@/features/shared/ui/maps-link";
import {
  getCityNameBySlug,
  getCityOrThrow,
  getRealEstateCategoryLabel,
  getRealEstateOrThrow,
  getRealEstateParams,
  getRealEstatePropertyTypeLabel,
  getRelatedRealEstate,
} from "@/lib/site";

export function generateStaticParams() {
  return getRealEstateParams();
}

export default async function RealEstateDetailPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const item = getRealEstateOrThrow(city.slug, slug);
  const related = getRelatedRealEstate(city.slug, slug, 2);
  const routeHref = buildRouteUrl(item);

  return (
    <SiteFrame city={city} currentSection="real-estate">
      <div className="space-y-6">
        <section className="surface-section p-6 lg:p-8">
          <Link href={`/${city.slug}/real-estate`} className="text-sm font-medium text-blue-900">
            ← Назад до нерухомості
          </Link>
          <div className="mt-5 space-y-4">
            <p className="eyebrow">{getRealEstateCategoryLabel(item.categorySlug)}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{item.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">{item.summary}</p>
            <div className="flex flex-wrap gap-2">
              {item.priceLabel ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.priceLabel}</span> : null}
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                {item.authorType === "business" ? "Бізнес" : "Приватне"}
              </span>
              {item.isVerified ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Перевірено</span> : null}
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_340px]">
          <Card as="section" className="space-y-5 rounded-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Деталі обʼєкта</h2>
            <p className="text-sm leading-8 text-slate-700">{item.body}</p>
            <div className="grid gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600 md:grid-cols-2">
              <p>
                <strong className="text-slate-900">Місто:</strong> {getCityNameBySlug(item.citySlug)}
              </p>
              <p>
                <strong className="text-slate-900">Район:</strong> {item.districtSlug ?? "Не вказано"}
              </p>
              <p>
                <strong className="text-slate-900">Тип житла:</strong> {getRealEstatePropertyTypeLabel(item.propertyType)}
              </p>
              <p>
                <strong className="text-slate-900">Площа:</strong> {item.areaSqm ? `${item.areaSqm} м²` : "Не вказано"}
              </p>
              <p>
                <strong className="text-slate-900">Спальні:</strong> {item.bedrooms ?? "Не вказано"}
              </p>
              <p>
                <strong className="text-slate-900">Санвузли:</strong> {item.bathrooms ?? "Не вказано"}
              </p>
            </div>
            <MapsLink
              addressText={item.addressText}
              latitude={item.latitude}
              longitude={item.longitude}
              googlePlaceId={item.googlePlaceId}
            />
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="eyebrow">Умови</p>
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>
                <strong className="text-slate-900">Меблі:</strong> {item.furnished ? "Так" : "Ні"}
              </p>
              <p>
                <strong className="text-slate-900">Тварини:</strong> {item.petsAllowed ? "Можна" : "Потрібно уточнити"}
              </p>
              <p>
                <strong className="text-slate-900">Адреса:</strong> {item.addressText ?? "Не вказано"}
              </p>
            </div>
            {item.businessProfileSlug ? (
              <Link href={`/business/${item.businessProfileSlug}`} className="cta-primary w-full justify-center">
                Відкрити бізнес-профіль
              </Link>
            ) : (
              <a href={routeHref} target="_blank" rel="noreferrer" className="cta-primary w-full justify-center">
                Побудувати маршрут
              </a>
            )}
          </Card>
        </div>

        {related.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Схожі обʼєкти поруч</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((relatedItem) => (
                <RealEstateCard key={relatedItem.id} citySlug={city.slug} item={relatedItem} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </SiteFrame>
  );
}
