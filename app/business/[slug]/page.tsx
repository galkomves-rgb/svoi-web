import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { businessProfiles } from "@/data/business-profiles";
import { MapsLink } from "@/features/shared/ui/maps-link";
import { StatusBadge } from "@/features/shared/ui/status-badge";

export default async function BusinessProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = businessProfiles.find((item) => item.slug === slug);

  if (!business) {
    notFound();
  }

  return (
    <SiteFrame>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{business.categorySlug}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{business.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{business.summary}</p>
          <div className="mt-4">
            <StatusBadge status={business.status} visibility={business.visibility} />
          </div>
        </section>

        <Card className="space-y-5 rounded-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Business profile</h2>
          <p className="text-sm leading-8 text-slate-700">{business.description}</p>
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
