import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SearchInput } from "@/features/shared/ui/search-input";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { SiteFrame } from "@/components/layout/site-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCityNameBySlug, getModuleCategoryLabel, getSearchModuleLabel, getSearchResultHref } from "@/lib/site";
import { getSearchResults } from "@/server/queries/public";
import type { SearchIndexRecord } from "@/types/domain";

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

  return (
    <SiteFrame>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Пошук по платформі"
            subtitle="Пошук працює по заголовку, опису, тексту, категорії та місту. Далі цей шар переходить у PostgreSQL full-text search у Supabase."
          />
          <div className="mt-6">
            <SearchInput defaultValues={{ query: params.q, citySlug: params.city, module: params.module, categorySlug: params.category, authorType: params.authorType, business: params.business ?? "all" }} />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              Результатів: <span className="font-semibold text-slate-900">{results.length}</span>
            </p>
            {results.length ? (
              <div className="grid gap-4">
                {results.map((result: SearchIndexRecord) => (
                  <Card key={result.id} as="article" className="space-y-4 rounded-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-900">
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
                      Відкрити результат
                    </Link>
                  </Card>
                ))}
              </div>
            ) : (
              <Card as="section" className="space-y-3 rounded-3xl bg-slate-50">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Нічого не знайдено</h2>
                <p className="text-sm leading-7 text-slate-600">Спробуйте змінити модуль, місто або ключове слово. Пошук має зводити користувача до конкретної дії, а не в порожню сторінку.</p>
                <Link href="/search" className="cta-secondary">
                  Очистити пошук
                </Link>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Як працює пошук</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">За змістом:</strong> заголовок, опис, текст, категорія і місто.
                </p>
                <p>
                  <strong className="text-slate-900">За модулем:</strong> оголошення, послуги, події або гіди.
                </p>
                <p>
                  <strong className="text-slate-900">За типом автора:</strong> приватний, бізнес, організація, офіційно.
                </p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4 rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що далі</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Відкривайте конкретний результат і переходьте на сторінку обʼєкта, а не залишайтесь у загальному списку.</p>
                <p>Наступний етап для цього модуля: реальний FTS ranking, highlighted matches і promoted search placements.</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
