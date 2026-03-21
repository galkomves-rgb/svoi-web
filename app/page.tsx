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
      <div className="section-stack">
        <Hero
          eyebrow="Платформа життєвих задач"
          title="Знайди житло, роботу, людей і потрібні сервіси без хаосу"
          lead="uahub.world обʼєднує оголошення, нерухомість, послуги, події, гіди, ресурси і приватні знайомства в одному зрозумілому просторі."
          primary={{ label: "Почати зі старту", href: "/start" }}
          secondary={{ label: "Перейти до пошуку", href: "/search" }}
          cityCards={cities}
          highlights={[
            "Швидкі входи в житло, роботу, документи й локальні послуги",
            "Місто працює як контекст, а не як обмеження всієї платформи",
            "Усі ключові модулі вже зібрані в одному UX-потоці",
          ]}
        />

        <QuickActions
          title="Мені потрібно"
          actions={[
            { title: "Знайти житло", description: "Оренда, продаж, кімнати й запити в окремому модулі.", href: "/torrevieja/real-estate", icon: "🏠" },
            { title: "Знайти роботу", description: "Практичні оголошення по роботі, побуту та допомозі.", href: "/torrevieja/listings", icon: "💼" },
            { title: "Знайти лікаря", description: "Перевірені сервіси й контакти для щоденних задач.", href: "/alicante/services", icon: "🩺" },
            { title: "Зробити документи", description: "NIE, житло, банк, школа й базові кроки для старту.", href: "/start", icon: "🧾" },
            { title: "Події поруч", description: "Мітапи, воркшопи, зустрічі та community-формати.", href: "/alicante/events", icon: "📅" },
            { title: "Запитати в спільноті", description: "Ресурси, канали, гіди та пошук потрібних людей.", href: "/alicante/resources", icon: "🤝" },
          ]}
        />

        <section className="surface-panel p-4 lg:p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Оголошення", text: "Щоденні задачі: робота, побут, допомога.", href: "/torrevieja/listings" },
              { title: "Нерухомість", text: "Житло винесене в окремий структурований модуль.", href: "/alicante/real-estate" },
              { title: "Послуги", text: "Бізнес, приватні виконавці та організації.", href: "/alicante/services" },
              { title: "Знайомства", text: "Приватний шар для друзів, нетворку й відносин.", href: "/alicante/dating" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="quick-tile">
                <strong className="block text-base text-slate-900">{item.title}</strong>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{item.text}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)]">
          <div className="section-stack">
            <PreviewSection
              eyebrow="Живий контент"
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

          <div className="section-stack">
            <PreviewSection eyebrow="Соціальний шар" title="Події поруч" actionLabel="Усі події" actionHref="/alicante/events" muted>
              <div className="grid gap-4">
                {events.slice(0, 3).map((event) => (
                  <EventEntityCard key={event.id} event={event} />
                ))}
              </div>
            </PreviewSection>

            <Card as="section" className="space-y-3 bg-blue-950 text-white">
              <p className="eyebrow-light">Для нових користувачів</p>
              <h2 className="text-xl font-semibold tracking-tight lg:text-2xl">Почати тут</h2>
              <p className="max-w-md text-sm leading-7 text-blue-100">
                Найкоротший маршрут для новоприбулих: NIE, житло, лікар, банк, школа та перші локальні контакти.
              </p>
              <Link href="/start" className="cta-secondary border-white/20 bg-white/10 text-white hover:bg-white/20">
                Відкрити стартовий блок
              </Link>
            </Card>

            <Card as="section" className="space-y-4 bg-white/75">
              <p className="eyebrow">Контекст платформи</p>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">Обери контекст і рухайся далі</h2>
              <div className="grid gap-3">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-white/70 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
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
