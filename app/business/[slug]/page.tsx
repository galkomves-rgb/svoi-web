import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { businessProfiles } from "@/data/business-profiles";
import { MapsLink } from "@/features/shared/ui/maps-link";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getServiceCategoryLabel } from "@/lib/site";

export default async function BusinessProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = businessProfiles.find((item) => item.slug === slug);

  if (!business) {
    notFound();
  }

  return (
    <SiteFrame>
      <div className="space-y-6">
        <section className="surface-section p-6 lg:p-8">
          <p className="eyebrow">{getServiceCategoryLabel(business.categorySlug)}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{business.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{business.summary}</p>
          <div className="mt-4">
            <StatusBadge status={business.status} visibility={business.visibility} />
          </div>
        </section>

        <Card className="space-y-5 rounded-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Бізнес-профіль</h2>
          <p className="text-sm leading-8 text-slate-700">{business.description}</p>
          {business.websiteUrl ? (
            <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="cta-primary">
              {business.contactLabel}
            </a>
          ) : null}
          <MapsLink
            addressText={business.addressText}
            latitude={business.latitude}
            longitude={business.longitude}
            googlePlaceId={business.googlePlaceId}
          />
        </Card>
      </div>
    </SiteFrame>
  );
}
