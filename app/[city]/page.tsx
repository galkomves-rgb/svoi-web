import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { PreviewSection } from "@/components/home/preview-section";
import { QuickActions } from "@/components/home/quick-actions";
import { Card } from "@/components/ui/card";
import { ListingCard } from "@/components/listings/listing-card";
import { SiteFrame } from "@/components/layout/site-frame";
import { EventEntityCard } from "@/features/events/event-entity-card";
import { RealEstateCard } from "@/features/real-estate/real-estate-card";
import { getCityEvents, getCityGuides, getCityListings, getCityOrThrow, getCityParams, getCityRealEstate } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityOrThrow(citySlug);
  const cityListings = getCityListings(city.slug, 3);
  const cityRealEstate = getCityRealEstate(city.slug, 2);
  const cityEvents = getCityEvents(city.slug, 2);
  const cityGuides = getCityGuides(city.slug, 2);

  return (
    <SiteFrame city={city} currentSection="overview">
      <div className="section-stack">
        <Hero
          eyebrow={`Локальний контекст · ${city.name}`}
          title={`Що зараз важливо в ${city.name}`}
          lead={city.heroLead}
          primary={{ label: "Дивитись оголошення", href: `/${city.slug}/listings` }}
          secondary={{ label: "Події поруч", href: `/${city.slug}/events` }}
          highlights={[
            "Житло, події, сервіси й довідка зібрані навколо реальних задач",
            "Місто лишається контекстом і фільтром, а не обмеженням усієї платформи",
            "Швидкі переходи ведуть до найкоротшого сценарію для користувача",
          ]}
        />

        <QuickActions
          title="Мені потрібно"
          actions={[
            { title: "Знайти житло", description: "Окремий модуль оренди, продажу й кімнат.", href: `/${city.slug}/real-estate`, icon: "🏠" },
            { title: "Знайти роботу", description: "Подивитися practical listings по місту.", href: `/${city.slug}/listings`, icon: "💼" },
            { title: "Знайти лікаря", description: "Перевірені послуги й корисні контакти.", href: `/${city.slug}/services`, icon: "🩺" },
            { title: "Зробити документи", description: "Відкрити гід для нових мешканців.", href: `/${city.slug}/guide`, icon: "🧾" },
            { title: "Події поруч", description: "Офлайн-зустрічі та воркшопи міста.", href: `/${city.slug}/events`, icon: "📅" },
            { title: "Знайомства", description: "Приватний модуль для друзів, нетворку і відносин.", href: `/${city.slug}/dating`, icon: "🤝" },
            { title: "Ресурси", description: "Групи, канали та перевірені community-лінки по місту.", href: `/${city.slug}/resources`, icon: "📚" },
          ]}
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.85fr)_minmax(300px,1fr)]">
          <div className="section-stack">
            <PreviewSection eyebrow="Головний потік" title="Свіжі оголошення" actionLabel="Усі оголошення" actionHref={`/${city.slug}/listings`}>
              <div className="grid gap-4">
                {cityListings.map((item) => (
                  <ListingCard key={item.id} citySlug={city.slug} listing={item} />
                ))}
              </div>
            </PreviewSection>

            <PreviewSection eyebrow="Житло окремо" title="Нерухомість" actionLabel="Уся нерухомість" actionHref={`/${city.slug}/real-estate`} muted>
              <div className="grid gap-4">
                {cityRealEstate.map((item) => (
                  <RealEstateCard key={item.id} citySlug={city.slug} item={item} />
                ))}
              </div>
            </PreviewSection>
          </div>

          <div className="section-stack">
            <PreviewSection eyebrow="Соціальна активність" title="Події поруч" actionLabel="Усі події" actionHref={`/${city.slug}/events`}>
              <div className="grid gap-4">
                {cityEvents.map((event) => (
                  <EventEntityCard key={event.id} event={event} />
                ))}
              </div>
            </PreviewSection>

            <Card as="section" className="space-y-4 bg-white/78">
              <p className="eyebrow">Почати тут</p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">Нові в {city.name}?</h2>
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

            <Card as="section" className="space-y-4">
              <p className="eyebrow">Локальний фокус</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Оголошення:</strong> закривають щоденні запити по житлу, роботі й послугах.
                </p>
                <p>
                  <strong className="text-slate-900">Події:</strong> переводять онлайн-інтерес у реальні звʼязки та довіру.
                </p>
                <p>
                  <strong className="text-slate-900">Гід:</strong> допомагає новим мешканцям пройти старт без хаосу.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
