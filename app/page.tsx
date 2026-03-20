import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { PreviewSection } from "@/components/home/preview-section";
import { QuickActions } from "@/components/home/quick-actions";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
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
          primary={{ label: "Почати зі Start", href: "/start" }}
          secondary={{ label: "Обрати місто", href: "/torrevieja" }}
          cityCards={cities}
        />

        <QuickActions
          title="Мені потрібно"
          actions={[
            { title: "Почати з Торревʼєхи", description: "Оголошення, події та послуги по місту.", href: "/torrevieja" },
            { title: "Почати з Аліканте", description: "Локальний dashboard і практичні сервіси.", href: "/alicante" },
            { title: "Start для нових", description: "NIE, житло, лікар, школа й базові кроки.", href: "/start" },
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
                {listings.slice(0, 4).map((item) => (
                  <Card key={item.id} as="article" className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{item.category}</p>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                        {cities.find((city) => city.slug === item.city)?.name}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </PreviewSection>
          </div>

          <div className="space-y-6">
            <PreviewSection title="Події поруч" actionLabel="Усі події" actionHref="/alicante/events">
              <div className="grid gap-4">
                {events.map((event) => (
                  <Card key={event.id} as="article" className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900">{event.title}</h3>
                      <span className="text-sm text-slate-500">{event.date}</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{event.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{event.type}</span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                        {cities.find((city) => city.slug === event.city)?.name}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </PreviewSection>

            <Card as="section" className="space-y-4 rounded-3xl bg-blue-950 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Нові в Іспанії?</p>
              <h2 className="text-2xl font-semibold tracking-tight">Start here</h2>
              <p className="max-w-md text-sm leading-7 text-blue-100">
                Найкоротший маршрут для новоприбулих: NIE, житло, лікар, банк, школа та перші локальні контакти.
              </p>
              <Link href="/start" className="cta-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
                Відкрити стартовий блок
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </SiteFrame>
  );
}
