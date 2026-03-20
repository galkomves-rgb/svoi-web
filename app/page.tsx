import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { PreviewSection } from "@/components/home/preview-section";
import { QuickActions } from "@/components/home/quick-actions";
import { Card } from "@/components/ui/card";
import { ListingCard } from "@/components/listings/listing-card";
import { SiteFrame } from "@/components/layout/site-frame";
import { EventEntityCard } from "@/features/events/event-entity-card";
import { events } from "@/data/events";
import { listings } from "@/data/listings";
import { cities } from "@/data/cities";

export default function HomePage() {
  return (
    <SiteFrame>
      <div className="space-y-6">
        <Hero
          title="Знайди житло, роботу та своїх поруч"
          lead="Все для українців у Costa Blanca: оголошення, послуги, події та стартова навігація для новоприбулих."
          primary={{ label: "Почати зі старту", href: "/start" }}
          secondary={{ label: "Обрати місто", href: "/torrevieja" }}
          cityCards={cities}
        />

        <QuickActions
          title="Мені потрібно"
          actions={[
            { title: "Почати з Торревʼєхи", description: "Оголошення, події та послуги по місту.", href: "/torrevieja" },
            { title: "Почати з Аліканте", description: "Локальний dashboard і практичні сервіси.", href: "/alicante" },
            { title: "Старт для нових", description: "NIE, житло, лікар, школа й базові кроки.", href: "/start" },
            { title: "Оголошення", description: "Подивитися перші practical listings.", href: "/torrevieja/listings" },
            { title: "Події", description: "Подивитися найближчі зустрічі та воркшопи.", href: "/alicante/events" },
            { title: "Послуги", description: "Перевірені контакти для повсякденних потреб.", href: "/alicante/services" },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <PreviewSection
              title="Свіжі оголошення"
              subtitle="Останні публікації з локальних стрічок по двох стартових містах."
              actionLabel="Усі оголошення"
              actionHref="/torrevieja/listings"
            >
              <div className="grid gap-4">
                {listings.slice(0, 3).map((item) => (
                  <ListingCard key={item.id} citySlug={item.citySlug} listing={item} />
                ))}
              </div>
            </PreviewSection>
          </div>

          <div className="space-y-6">
            <PreviewSection title="Події поруч" actionLabel="Усі події" actionHref="/alicante/events">
              <div className="grid gap-4">
                {events.slice(0, 3).map((event) => (
                  <EventEntityCard key={event.id} event={event} />
                ))}
              </div>
            </PreviewSection>

            <Card as="section" className="space-y-4 rounded-3xl bg-blue-950 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Нові в Іспанії?</p>
              <h2 className="text-2xl font-semibold tracking-tight">Почати тут</h2>
              <p className="max-w-md text-sm leading-7 text-blue-100">
                Найкоротший маршрут для новоприбулих: NIE, житло, лікар, банк, школа та перші локальні контакти.
              </p>
              <Link href="/start" className="cta-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
                Відкрити стартовий блок
              </Link>
            </Card>

            <Card as="section" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що далі</p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Вибери місто і закрий першу задачу</h2>
              <div className="grid gap-3">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span>{city.name}</span>
                    <span className="text-slate-400">→</span>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
