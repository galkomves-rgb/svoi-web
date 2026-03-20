import Link from "next/link";
import type { GuideRecord } from "@/types/domain";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { Card } from "@/components/ui/card";

export function GuideEntityCard({ guide }: { guide: GuideRecord }) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{guide.categorySlug}</p>
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">{guide.title}</h3>
        <p className="text-sm leading-7 text-slate-600">{guide.summary}</p>
      </div>
      <StatusBadge status={guide.status} visibility={guide.visibility} featured={guide.featured} />
      <Link href={`/${guide.citySlug}/guide/${guide.slug}`} className="cta-secondary">
        Відкрити гід
      </Link>
    </Card>
  );
}
