import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { PreviewSection } from "@/components/home/preview-section";
import { QuickActions } from "@/components/home/quick-actions";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { getCityEvents, getCityGuides, getCityListings, getCityOrThrow, getCityParams } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);
  const cityListings = getCityListings(city.slug, 3);
  const cityEvents = getCityEvents(city.slug, 2);
  const cityGuides = getCityGuides(city.slug, 2);

  return (
    <SiteFrame city={city} currentSection="overview">
      <div className="space-y-6">
        <Hero
          title={city.heroTitle}
          lead={city.heroLead}
          primary={{ label: "Дивитись оголошення", href: `/${city.slug}/listings` }}
          secondary={{ label: "Події поруч", href: `/${city.slug}/events` }}
        />

        <QuickActions
          title="Мені потрібно"
          actions={[
            { title: "Знайти житло", description: "Перейти до локальних оголошень.", href: `/${city.slug}/listings` },
            { title: "Знайти роботу", description: "Подивитися practical listings по місту.", href: `/${city.slug}/listings` },
            { title: "Знайти лікаря", description: "Перевірені послуги й корисні контакти.", href: `/${city.slug}/services` },
            { title: "Зробити документи", description: "Відкрити гід для нових мешканців.", href: `/${city.slug}/guide` },
            { title: "Події поруч", description: "Офлайн-зустрічі та воркшопи міста.", href: `/${city.slug}/events` },
            { title: "Почати тут", description: "Базова стартова сторінка для новоприбулих.", href: "/start" },
          ]}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,1fr)]">
          <PreviewSection title="Свіжі оголошення" actionLabel="Усі оголошення" actionHref={`/${city.slug}/listings`}>
            <div className="grid gap-4">
              {cityListings.map((item) => (
                <Card key={item.id} as="article" className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{item.category}</p>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </PreviewSection>

          <div className="space-y-6">
            <PreviewSection title="Події поруч" actionLabel="Усі події" actionHref={`/${city.slug}/events`}>
              <div className="grid gap-4">
                {cityEvents.map((event) => (
                  <Card key={event.id} as="article" className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900">{event.title}</h3>
                      <span className="text-sm text-slate-500">{event.date}</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{event.description}</p>
                  </Card>
                ))}
              </div>
            </PreviewSection>

            <Card as="section" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Почати тут</p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Нові в {city.name}?</h2>
              <ul className="grid gap-3 text-sm leading-7 text-slate-600">
                {cityGuides.map((guide) => (
                  <li key={guide.id}>
                    <strong className="block text-slate-900">{guide.title}</strong>
                    <span>{guide.summary}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/${city.slug}/guide`} className="cta-secondary">
                Відкрити гід
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
