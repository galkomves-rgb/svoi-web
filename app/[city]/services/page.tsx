import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { getCityOrThrow, getCityParams, getCityServices } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

export default async function ServicesPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);
  const cityServices = getCityServices(city.slug);

  return (
    <SiteFrame city={city} currentSection="services">
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <SectionHeading
            title="Послуги"
            subtitle={`Перевірені контакти, локальні сервіси та бізнеси для української спільноти в ${city.name}.`}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {cityServices.map((service) => (
            <Card key={service.id} as="article" className="space-y-4 rounded-3xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{service.category}</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{service.name}</h2>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    service.verified ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {service.verified ? "Перевірено" : "Нове"}
                </span>
              </div>
              <p className="text-sm leading-7 text-slate-600">{service.description}</p>
              <button type="button" className="cta-secondary">
                {service.contactLabel}
              </button>
            </Card>
          ))}
        </section>
      </div>
    </SiteFrame>
  );
}
