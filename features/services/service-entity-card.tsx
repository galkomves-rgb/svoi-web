import Link from "next/link";
import type { ServiceRecord } from "@/types/domain";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { Card } from "@/components/ui/card";

export function ServiceEntityCard({ service }: { service: ServiceRecord }) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{service.categorySlug}</p>
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">{service.title}</h3>
        <p className="text-sm leading-7 text-slate-600">{service.summary}</p>
      </div>
      <div className="space-y-2">
        <AuthorBadge authorType={service.authorType} verified={service.isVerified} />
        <StatusBadge status={service.status} visibility={service.visibility} featured={service.featured} />
      </div>
      <Link href={`/${service.citySlug}/services/${service.slug}`} className="cta-secondary">
        Відкрити профіль
      </Link>
    </Card>
  );
}
