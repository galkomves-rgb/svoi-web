import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { MapsLink } from "@/features/shared/ui/maps-link";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityOrThrow, getServiceOrThrow, getServiceParams } from "@/lib/site";

export function generateStaticParams() {
  return getServiceParams();
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const service = getServiceOrThrow(city.slug, slug);

  return (
    <SiteFrame city={city} currentSection="services">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <Link href={`/${city.slug}/services`} className="text-sm font-medium text-blue-900">
            ← Назад до послуг
          </Link>
          <div className="mt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{service.categorySlug}</p>
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
            <MapsLink
              addressText={service.addressText}
              latitude={service.latitude}
              longitude={service.longitude}
              googlePlaceId={service.googlePlaceId}
            />
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Контакт</p>
            <p className="text-sm leading-7 text-slate-600">Сервіс повинен мати окремий бізнес/приватний статус і контрольований контактний flow.</p>
            <button type="button" className="cta-primary w-full justify-center">
              {service.contactLabel}
            </button>
          </Card>
        </div>
      </div>
    </SiteFrame>
  );
}
