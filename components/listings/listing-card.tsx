import Link from "next/link";
import type { Listing } from "@/data/listings";
import { Card } from "@/components/ui/card";
import { defaultLocale } from "@/lib/i18n/ui";
import { getListingCategoryLabel, getListingTaxonomyLabel } from "@/lib/site";
import { AuthorBadge } from "@/features/shared/ui/author-badge";

type ListingCardProps = {
  citySlug: string;
  listing: Listing;
};

export function ListingCard({ citySlug, listing }: ListingCardProps) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="eyebrow">{getListingCategoryLabel(listing.categorySlug)}</p>
            <span className="status-pill">{getListingTaxonomyLabel(listing.categorySlug)}</span>
            {listing.featured ? <span className="status-pill bg-blue-100 text-blue-900">Рекомендовано</span> : null}
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-[1.35rem]">{listing.title}</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span>{new Date(listing.createdAt).toLocaleDateString(defaultLocale)}</span>
              {listing.districtSlug ? <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{listing.districtSlug}</span> : null}
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right">
          {listing.priceLabel ? <strong className="block text-base text-slate-900">{listing.priceLabel}</strong> : null}
          <span className="text-sm text-slate-500">Оновлено для локального каталогу</span>
        </div>
      </div>

      <p className="text-sm leading-6 text-slate-600">{listing.summary}</p>

      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {listing.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="space-y-2">
          <AuthorBadge authorType={listing.authorType} verified={listing.isVerified} />
          <span className="text-sm text-slate-500">Відкрийте деталі, щоб перевірити умови, адресу й формат контакту.</span>
        </div>
        <Link href={`/${citySlug}/listings/${listing.slug}`} className="cta-secondary">
          Відкрити деталі
        </Link>
      </div>
    </Card>
  );
}
