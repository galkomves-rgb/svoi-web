import Link from "next/link";
import type { ServiceRecord } from "@/types/domain";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { Card } from "@/components/ui/card";
import { getServiceCategoryLabel } from "@/lib/site";

export function ServiceEntityCard({ service }: { service: ServiceRecord }) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{getServiceCategoryLabel(service.categorySlug)}</p>
          {service.addressText ? <span className="text-xs font-medium text-slate-500">{service.addressText}</span> : null}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">{service.title}</h3>
        <p className="text-sm leading-7 text-slate-600">{service.summary}</p>
      </div>
      <div className="space-y-3">
        <AuthorBadge authorType={service.authorType} verified={service.isVerified} />
        <StatusBadge status={service.status} visibility={service.visibility} featured={service.featured} />
        {service.tags.length ? (
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href={`/${service.citySlug}/services/${service.slug}`} className="cta-secondary">
          Відкрити профіль
        </Link>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900">{service.contactLabel}</span>
      </div>
    </Card>
  );
}
