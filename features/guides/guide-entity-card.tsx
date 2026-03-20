import Link from "next/link";
import type { GuideRecord } from "@/types/domain";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { Card } from "@/components/ui/card";
import { getGuideCategoryLabel } from "@/lib/site";

export function GuideEntityCard({ guide }: { guide: GuideRecord }) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{getGuideCategoryLabel(guide.categorySlug)}</p>
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">{guide.title}</h3>
        <p className="text-sm leading-7 text-slate-600">{guide.summary}</p>
        <div className="flex flex-wrap gap-2">
          {guide.steps.slice(0, 2).map((step) => (
            <span key={step} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {step}
            </span>
          ))}
        </div>
      </div>
      <StatusBadge status={guide.status} visibility={guide.visibility} featured={guide.featured} />
      <Link href={`/${guide.citySlug}/guide/${guide.slug}`} className="cta-secondary">
        Відкрити гід
      </Link>
    </Card>
  );
}
