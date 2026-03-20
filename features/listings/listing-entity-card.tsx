import Link from "next/link";
import type { ListingRecord } from "@/types/domain";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { Card } from "@/components/ui/card";

type ListingEntityCardProps = {
  listing: ListingRecord;
};

export function ListingEntityCard({ listing }: ListingEntityCardProps) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{listing.categorySlug}</p>
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">{listing.title}</h3>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">{listing.summary}</p>
        </div>
        {listing.priceLabel ? <span className="rounded-2xl bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">{listing.priceLabel}</span> : null}
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-slate-500">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{listing.citySlug}</span>
        {listing.districtSlug ? <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{listing.districtSlug}</span> : null}
        {listing.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <AuthorBadge authorType={listing.authorType} verified={listing.isVerified} />
          <StatusBadge status={listing.status} visibility={listing.visibility} featured={listing.featured} />
        </div>
        <Link href={`/${listing.citySlug}/listings/${listing.slug}`} className="cta-primary">
          Відкрити деталі
        </Link>
      </div>
    </Card>
  );
}
