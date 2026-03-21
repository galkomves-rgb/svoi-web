import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { ServiceEntityCard } from "@/features/services/service-entity-card";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { MapsLink } from "@/features/shared/ui/maps-link";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityOrThrow, getRelatedServices, getServiceCategoryLabel, getServiceOrThrow, getServiceParams } from "@/lib/site";

export function generateStaticParams() {
  return getServiceParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; slug: string }> }): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const service = getServiceOrThrow(city.slug, slug);
  return {
    title: `${service.title} — ${city.name}`,
    description: service.summary,
    openGraph: {
      title: service.title,
      description: service.summary,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const service = getServiceOrThrow(city.slug, slug);
  const relatedServices = getRelatedServices(city.slug, slug, 2);

  return (
    <SiteFrame city={city} currentSection="services">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <Link href={`/${city.slug}/services`} className="text-sm font-medium text-blue-900">
            ← Назад до послуг
          </Link>
          <div className="mt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{getServiceCategoryLabel(service.categorySlug)}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{service.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">{service.summary}</p>
            <AuthorBadge authorType={service.authorType} verified={service.isVerified} />
            <StatusBadge status={service.status} visibility={service.visibility} featured={service.featured} />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_340px]">
          <Card as="section" className="space-y-5 rounded-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Профіль сервісу</h2>
            <p className="text-sm leading-8 text-slate-700">{service.body}</p>
            {service.tags.length ? (
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <MapsLink
              addressText={service.addressText}
              latitude={service.latitude}
              longitude={service.longitude}
              googlePlaceId={service.googlePlaceId}
            />
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Контакт</p>
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>
                <strong className="text-slate-900">Місто:</strong> {city.name}
              </p>
              {service.addressText ? (
                <p>
                  <strong className="text-slate-900">Локація:</strong> {service.addressText}
                </p>
              ) : null}
              <p>
                <strong className="text-slate-900">Контакт:</strong> {service.contactLabel}
              </p>
            </div>
            {service.businessProfileSlug ? (
              <Link href={`/business/${service.businessProfileSlug}`} className="cta-secondary w-full justify-center">
                Відкрити бізнес-профіль
              </Link>
            ) : null}
            <button type="button" className="cta-primary w-full justify-center">
              {service.contactLabel}
            </button>
          </Card>
        </div>

        {relatedServices.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Схожі сервіси поруч</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedServices.map((item) => (
                <ServiceEntityCard key={item.id} service={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </SiteFrame>
  );
}
