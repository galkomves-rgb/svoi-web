import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { GuideEntityCard } from "@/features/guides/guide-entity-card";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityOrThrow, getGuideCategoryLabel, getGuideNextActions, getGuideOrThrow, getGuideParams, getRelatedGuides } from "@/lib/site";

export function generateStaticParams() {
  return getGuideParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; slug: string }> }): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const guide = getGuideOrThrow(city.slug, slug);
  return {
    title: `${guide.title} — ${city.name}`,
    description: guide.summary,
    openGraph: {
      title: guide.title,
      description: guide.summary,
    },
  };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const guide = getGuideOrThrow(city.slug, slug);
  const nextActions = getGuideNextActions(city.slug, guide.categorySlug);
  const relatedGuides = getRelatedGuides(city.slug, slug, 2);

  return (
    <SiteFrame city={city} currentSection="guide">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <Link href={`/${city.slug}/guide`} className="text-sm font-medium text-blue-900">
            ← Назад до гідів
          </Link>
          <div className="mt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{getGuideCategoryLabel(guide.categorySlug)}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{guide.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">{guide.summary}</p>
            <StatusBadge status={guide.status} visibility={guide.visibility} featured={guide.featured} />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_340px]">
          <Card as="section" className="space-y-5 rounded-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Покроково</h2>
            <p className="text-sm leading-8 text-slate-700">{guide.body}</p>
            <ol className="grid gap-3 text-sm leading-7 text-slate-700">
              {guide.steps.map((step, index) => (
                <li key={step} className="rounded-2xl bg-slate-50 px-4 py-3">
                  <strong className="mr-2 text-slate-900">{index + 1}.</strong>
                  {step}
                </li>
              ))}
            </ol>
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що робити далі</p>
            <div className="grid gap-3">
              {nextActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <strong className="block text-base text-slate-900">{action.title}</strong>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{action.description}</span>
                  <span className="mt-4 inline-flex text-sm font-semibold text-blue-900">Перейти →</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {relatedGuides.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Схожі матеріали</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedGuides.map((item) => (
                <GuideEntityCard key={item.id} guide={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </SiteFrame>
  );
}
