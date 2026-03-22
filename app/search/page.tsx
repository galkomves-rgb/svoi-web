import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SearchInput } from "@/features/shared/ui/search-input";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { SiteFrame } from "@/components/layout/site-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { pagesUi } from "@/lib/i18n/pages";
import { getCityNameBySlug, getModuleCategoryLabel, getSearchModuleLabel, getSearchResultHref, searchAuthorLabels } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { getSearchResults } from "@/server/queries/public";
import type { SearchIndexRecord } from "@/types/domain";

export const metadata: Metadata = buildMetadata({
  title: "Пошук",
  description: "Глобальний пошук по оголошеннях, нерухомості, сервісах, подіях, гідах і ресурсах платформи.",
  path: "/search",
});

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
    city?: string;
    module?: string;
    category?: string;
    authorType?: string;
    business?: "all" | "business" | "private";
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const results = await getSearchResults({
    query: params.q,
    citySlug: params.city,
    module: params.module,
    categorySlug: params.category,
    authorType: params.authorType,
    business: params.business,
  });
  const activeFilters = [
    params.city ? `Місто: ${getCityNameBySlug(params.city)}` : null,
    params.module ? `Модуль: ${getSearchModuleLabel(params.module)}` : null,
    params.category && params.module ? `Категорія: ${getModuleCategoryLabel(params.module, params.category)}` : null,
    params.authorType ? `Автор: ${searchAuthorLabels[params.authorType as keyof typeof searchAuthorLabels] ?? params.authorType}` : null,
    params.business && params.business !== "all" ? `Тип: ${params.business === "business" ? "Бізнес" : "Приватні"}` : null,
  ].filter(Boolean);

  return (
    <SiteFrame>
      <div className="space-y-6">
        <section className="surface-section p-6 lg:p-8">
          <SectionHeading
            title={pagesUi.search.title}
            subtitle={pagesUi.search.subtitle}
          />
          <div className="mt-6">
            <SearchInput defaultValues={{ query: params.q, citySlug: params.city, module: params.module, categorySlug: params.category, authorType: params.authorType, business: params.business ?? "all" }} />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              {pagesUi.search.results}: <span className="font-semibold text-slate-900">{results.length}</span>
            </p>
            {activeFilters.length ? <div className="flex flex-wrap gap-2 text-sm text-slate-600">{activeFilters.map((filter) => <span key={filter} className="status-pill">{filter}</span>)}</div> : null}
            {results.length ? (
              <div className="grid gap-4 md:grid-cols-2">
                {results.map((result: SearchIndexRecord) => (
                  <Card key={result.id} as="article" className="space-y-4 rounded-3xl">
                    <div className="eyebrow flex flex-wrap items-center gap-2">
                      <span>{getSearchModuleLabel(result.module)}</span>
                      <span>{getCityNameBySlug(result.citySlug)}</span>
                      <span>{getModuleCategoryLabel(result.module, result.categorySlug)}</span>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{result.title}</h2>
                      <p className="text-sm leading-7 text-slate-600">{result.summary}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <AuthorBadge authorType={result.authorType} verified={result.featured} />
                      {result.featured ? <span className="rounded-full bg-blue-900 px-3 py-1 text-xs font-semibold text-white">Рекомендовано</span> : null}
                    </div>
                    <Link href={getSearchResultHref(result)} className="cta-secondary">
                      {pagesUi.search.openResult}
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <Card as="section" className="space-y-3 rounded-3xl bg-slate-50">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{pagesUi.search.emptyTitle}</h2>
                <p className="text-sm leading-7 text-slate-600">{pagesUi.search.emptyDescription}</p>
                <Link href="/search" className="cta-secondary">
                  {pagesUi.search.clearSearch}
                </Link>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="eyebrow">{pagesUi.search.howItWorks}</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">{pagesUi.search.byContentLead}</strong> {pagesUi.search.byContentText}
                </p>
                <p>
                  <strong className="text-slate-900">{pagesUi.search.byModuleLead}</strong> {pagesUi.search.byModuleText}
                </p>
                <p>
                  <strong className="text-slate-900">{pagesUi.search.byAuthorLead}</strong> {pagesUi.search.byAuthorText}
                </p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4 rounded-3xl">
              <p className="eyebrow">{pagesUi.search.nextTitle}</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>{pagesUi.search.nextLineOne}</p>
                <p>{pagesUi.search.nextLineTwo}</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
