import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { getCityListings, getCityOrThrow, getCityParams } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

export default async function ListingsPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);
  const cityListings = getCityListings(city.slug);

  return (
    <SiteFrame city={city} currentSection="listings">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Свіжі оголошення"
            subtitle={`Практичні listings для ${city.name}: житло, робота та послуги без перевантаження інтерфейсу.`}
          />
        </section>

        <section className="grid gap-4">
          {cityListings.map((item) => (
            <Card key={item.id} as="article" className="space-y-4 rounded-3xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{item.category}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{item.title}</h2>
                </div>
                <span className="text-sm text-slate-500">{item.date}</span>
              </div>
              <p className="text-sm leading-7 text-slate-600">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </section>
      </div>
    </SiteFrame>
  );
}
