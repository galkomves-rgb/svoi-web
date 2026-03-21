import type { ResourceRecord } from "@/types/domain";
import { Card } from "@/components/ui/card";
import { getGuideCategoryLabel, getResourcePlatformLabel } from "@/lib/site";

export function ResourceEntityCard({ resource }: { resource: ResourceRecord }) {
  return (
    <Card as="article" className="space-y-3.5 rounded-3xl">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="eyebrow">{getResourcePlatformLabel(resource.platform)}</p>
          <span className="text-xs font-medium text-slate-500">{getGuideCategoryLabel(resource.categorySlug)}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">{resource.title}</h3>
        <p className="text-sm leading-6 text-slate-600">{resource.summary}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{resource.activityLabel}</span>
        {resource.isVerified ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Перевірено</span> : null}
      </div>

      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className="cta-secondary"
      >
        Відкрити ресурс
      </a>
    </Card>
  );
}
