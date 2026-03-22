import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { ResourceEntityCard } from "@/features/resources/resource-entity-card";
import {
  getCityOrThrow,
  getRelatedResources,
  getResourceCategoryLabel,
  getResourceNextActions,
  getResourceOrThrow,
  getResourceParams,
  getResourcePlatformLabel,
} from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getResourceParams();
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; slug: string }> }): Promise<Metadata> {
  const { city: citySlug, slug } = await params;
  const resource = getResourceOrThrow(citySlug, slug);

  return buildMetadata({
    title: resource.title,
    description: resource.summary,
    path: `/${resource.citySlug}/resources/${resource.slug}`,
  });
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city: citySlug, slug } = await params;
  const city = getCityOrThrow(citySlug);
  const resource = getResourceOrThrow(city.slug, slug);
  const nextActions = getResourceNextActions(city.slug, resource.categorySlug);
  const relatedResources = getRelatedResources(city.slug, slug, 2);

  return (
    <SiteFrame city={city} currentSection="resources">
      <div className="space-y-6">
        <section className="surface-section p-6 lg:p-8">
          <Link href={`/${city.slug}/resources`} className="text-sm font-medium text-blue-900">
            ← Назад до ресурсів
          </Link>
          <div className="mt-5 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <p className="eyebrow">{getResourcePlatformLabel(resource.platform)}</p>
              <span>{getResourceCategoryLabel(resource.categorySlug)}</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{resource.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">{resource.summary}</p>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_340px]">
          <Card as="section" className="space-y-5 rounded-3xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Що це за ресурс</h2>
            <p className="text-sm leading-8 text-slate-700">{resource.body}</p>
            <div className="flex flex-wrap gap-2">
              <span className="status-pill">{city.name}</span>
              <span className="status-pill">{resource.activityLabel}</span>
              <span className="status-pill">{getResourcePlatformLabel(resource.platform)}</span>
              {resource.isVerified ? <span className="status-pill bg-emerald-100 text-emerald-700">Перевірено</span> : null}
            </div>
            <a href={resource.url} target="_blank" rel="noreferrer" className="cta-primary">
              Відкрити зовнішній ресурс
            </a>
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="eyebrow">Що робити далі</p>
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>
                <strong className="text-slate-900">Формат:</strong> {getResourcePlatformLabel(resource.platform)}
              </p>
              <p>
                <strong className="text-slate-900">Роль:</strong> trusted entry-point у зовнішню community-точку.
              </p>
              <p>
                Спочатку перевірте, чи ресурс живий і релевантний, а далі переходьте в локальні модулі платформи для конкретної дії.
              </p>
            </div>
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

        {relatedResources.length ? (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Схожі ресурси поруч</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedResources.map((item) => (
                <ResourceEntityCard key={item.id} resource={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </SiteFrame>
  );
}