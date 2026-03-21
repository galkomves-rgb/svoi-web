import Link from "next/link";
import type { EventRecord } from "@/types/domain";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { Card } from "@/components/ui/card";
import { defaultLocale } from "@/lib/i18n/ui";
import { formatEventDateRange, getEventCategoryLabel } from "@/lib/site";

export function EventEntityCard({ event }: { event: EventRecord }) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow">{getEventCategoryLabel(event.categorySlug)}</p>
          <span className="text-xs font-medium text-slate-500">{event.addressText ?? event.citySlug}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">{event.title}</h3>
          <span className="text-sm font-medium text-slate-500">{new Date(event.startsAt).toLocaleDateString(defaultLocale)}</span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{event.summary}</p>
        <p className="text-sm font-medium text-slate-700">{formatEventDateRange(event.startsAt, event.endsAt)}</p>
      </div>
      <div className="space-y-2">
        <AuthorBadge authorType={event.authorType} verified={event.isVerified} />
        <StatusBadge status={event.status} visibility={event.visibility} featured={event.featured} />
      </div>
      <Link href={`/${event.citySlug}/events/${event.slug}`} className="cta-secondary">
        Відкрити подію
      </Link>
    </Card>
  );
}
