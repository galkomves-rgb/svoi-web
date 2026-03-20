import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { ServiceEntityCard } from "@/features/services/service-entity-card";
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
            <ServiceEntityCard key={service.id} service={service} />
          ))}
        </section>
      </div>
    </SiteFrame>
  );
}
