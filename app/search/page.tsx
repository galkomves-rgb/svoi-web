import { Card } from "@/components/ui/card";
import { SearchInput } from "@/features/shared/ui/search-input";
import { SiteFrame } from "@/components/layout/site-frame";
import { getSearchResults } from "@/server/queries/public";

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
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Пошук по платформі</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Пошук працює по title, summary, body, category та city. Далі це переходить у PostgreSQL full-text search у Supabase.</p>
          <div className="mt-6">
            <SearchInput defaultValues={{ query: params.q, citySlug: params.city, module: params.module, categorySlug: params.category, authorType: params.authorType, business: params.business ?? "all" }} />
          </div>
        </section>

        <section className="grid gap-4">
          {results.map((result) => (
            <Card key={result.id} as="article" className="space-y-3 rounded-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-900">
                <span>{result.module}</span>
                <span>{result.citySlug}</span>
                <span>{result.categorySlug}</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{result.title}</h2>
              <p className="text-sm leading-7 text-slate-600">{result.summary}</p>
            </Card>
          ))}
        </section>
      </div>
    </SiteFrame>
  );
}
