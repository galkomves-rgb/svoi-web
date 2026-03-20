import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityOrThrow, getGuideOrThrow, getGuideParams } from "@/lib/site";

export function generateStaticParams() {
  return getGuideParams();
}

export default async function GuideDetailPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const guide = getGuideOrThrow(city.slug, slug);

  return (
    <SiteFrame city={city} currentSection="guide">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <Link href={`/${city.slug}/guide`} className="text-sm font-medium text-blue-900">
            ← Назад до гідів
          </Link>
          <div className="mt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{guide.categorySlug}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{guide.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">{guide.summary}</p>
            <StatusBadge status={guide.status} visibility={guide.visibility} featured={guide.featured} />
          </div>
        </section>

        <Card as="section" className="space-y-5 rounded-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Покроково</h2>
          <p className="text-sm leading-8 text-slate-700">{guide.body}</p>
          <ol className="grid gap-3 text-sm leading-7 text-slate-700">
            {guide.steps.map((step) => (
              <li key={step} className="rounded-2xl bg-slate-50 px-4 py-3">
                {step}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </SiteFrame>
  );
}
