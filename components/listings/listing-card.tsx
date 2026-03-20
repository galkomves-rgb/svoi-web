import Link from "next/link";
import type { Listing } from "@/data/listings";
import { Card } from "@/components/ui/card";
import { getListingCategoryLabel } from "@/lib/site";
import { AuthorBadge } from "@/features/shared/ui/author-badge";

type ListingCardProps = {
  citySlug: string;
  listing: Listing;
};

export function ListingCard({ citySlug, listing }: ListingCardProps) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{getListingCategoryLabel(listing.categorySlug)}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{listing.title}</h2>
        </div>
        <div className="text-right">
          {listing.priceLabel ? <strong className="block text-base text-slate-900">{listing.priceLabel}</strong> : null}
          <span className="text-sm text-slate-500">{new Date(listing.createdAt).toLocaleDateString("uk-UA")}</span>
        </div>
      </div>

      <p className="text-sm leading-7 text-slate-600">{listing.summary}</p>

      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {listing.districtSlug ? <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{listing.districtSlug}</span> : null}
        {listing.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="space-y-2">
          <AuthorBadge authorType={listing.authorType} verified={listing.isVerified} />
          <span className="text-sm text-slate-500">Що далі: відкрий деталі й перевір умови перед контактом.</span>
        </div>
        <Link href={`/${citySlug}/listings/${listing.slug}`} className="cta-secondary">
          Відкрити деталі
        </Link>
      </div>
    </Card>
  );
}
