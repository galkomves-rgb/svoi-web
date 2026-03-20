import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { getCityGuides, getCityOrThrow, getCityParams } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

export default async function GuidePage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);
  const cityGuides = getCityGuides(city.slug);

  return (
    <SiteFrame city={city} currentSection="guide">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Гід"
            subtitle={`Прості тексти без бюрократії: найважливіше для старту, документів і щоденного життя в ${city.name}.`}
          />
        </section>

        <section className="grid gap-4">
          {cityGuides.map((guide) => (
            <Card key={guide.id} as="article" className="space-y-4 rounded-3xl">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{guide.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{guide.summary}</p>
              </div>
              <ol className="grid gap-3 text-sm leading-7 text-slate-700">
                {guide.steps.map((step) => (
                  <li key={step} className="rounded-2xl bg-slate-50 px-4 py-3">
                    {step}
                  </li>
                ))}
              </ol>
            </Card>
          ))}
        </section>
      </div>
    </SiteFrame>
  );
}
