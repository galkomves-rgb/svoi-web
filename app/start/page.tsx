import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/layout/site-frame";
import { Card } from "@/components/ui/card";
import { cities } from "@/data/cities";
import { startPlans, startScenarios } from "@/data/start";
import { pagesUi } from "@/lib/i18n/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Старт в Іспанії",
  description: "Швидкий маршрут для новоприбулих: місто, документи, житло, сервіси й перші локальні кроки без хаосу.",
  path: "/start",
});

export default function StartPage() {
  return (
    <SiteFrame>
      <div className="section-stack">
        <section className="surface-feature p-6 lg:p-8">
          <div className="max-w-3xl">
            <p className="eyebrow">{pagesUi.start.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{pagesUi.start.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {pagesUi.start.lead}
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {cities.map((city) => (
              <article key={city.slug} className="surface-panel grid gap-4 p-5">
                <div className="space-y-2">
                  <p className="eyebrow">{city.name}</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{pagesUi.start.cityContextTitle(city.name)}</h2>
                  <p className="text-sm leading-7 text-slate-600">{city.heroLead}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={`/${city.slug}`} className="cta-primary">
                    {pagesUi.start.openCity}
                  </Link>
                  <Link href={`/${city.slug}/guide`} className="text-sm font-semibold text-blue-900 transition hover:text-blue-800">
                    {pagesUi.start.cityGuide}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-section p-6 lg:p-8">
          <div className="max-w-2xl">
            <p className="eyebrow">{pagesUi.start.scenariosEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{pagesUi.start.scenariosTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {pagesUi.start.scenariosLead}
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {startScenarios.map((scenario) => (
              <article key={scenario.id} className="surface-panel grid gap-3 p-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{scenario.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{scenario.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <Link key={city.slug} href={scenario.href(city.slug)} className="nav-chip">
                      {city.name}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          {startPlans.map((plan) => {
            const city = cities.find((item) => item.slug === plan.city);

            if (!city) {
              return null;
            }

            return (
              <Card key={plan.city} as="section" className="space-y-5 rounded-3xl">
                <div>
                  <p className="eyebrow">{city.name}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{plan.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{plan.description}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="eyebrow-muted text-sm">{pagesUi.start.firstWeek}</h3>
                  <ul className="grid gap-3 text-sm leading-7 text-slate-700">
                    {plan.checklist.map((item) => (
                      <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3">
                  {plan.actions.map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <strong className="block text-base text-slate-900">{action.title}</strong>
                      <span className="mt-2 block text-sm leading-6 text-slate-600">{action.description}</span>
                      <span className="mt-4 inline-flex text-sm font-semibold text-blue-900">{action.ctaLabel} →</span>
                    </Link>
                  ))}
                </div>
              </Card>
            );
          })}
        </section>

        <section className="surface-panel p-5 lg:p-6">
          <div>
            <p className="eyebrow">{pagesUi.start.quickRouteEyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{pagesUi.start.quickRouteTitle}</h2>
          </div>
          <ol className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 md:grid-cols-2">
            <li className="rounded-2xl bg-slate-50 px-4 py-3">
              <strong className="mr-2 text-slate-900">1.</strong> Оберіть місто і відкрийте місцевий guide.
            </li>
            <li className="rounded-2xl bg-slate-50 px-4 py-3">
              <strong className="mr-2 text-slate-900">2.</strong> Перевірте житло або тимчасове рішення через оголошення.
            </li>
            <li className="rounded-2xl bg-slate-50 px-4 py-3">
              <strong className="mr-2 text-slate-900">3.</strong> Збережіть 1-2 verified services по документах, лікарю або побуту.
            </li>
            <li className="rounded-2xl bg-slate-50 px-4 py-3">
              <strong className="mr-2 text-slate-900">4.</strong> Подивіться найближчу локальну подію, щоб знайти живі контакти.
            </li>
          </ol>
        </section>
      </div>
    </SiteFrame>
  );
}
