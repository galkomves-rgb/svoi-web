import Link from "next/link";
import { SiteFrame } from "@/components/layout/site-frame";
import { Card } from "@/components/ui/card";
import { cities } from "@/data/cities";
import { startPlans, startScenarios } from "@/data/start";

export default function StartPage() {
  return (
    <SiteFrame>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Start</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Почати життя в Іспанії без хаосу</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Це стартовий блок для новоприбулих: документи, житло, лікар, школа, базові сервіси і зрозумілі наступні кроки по місту.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {cities.map((city) => (
            <Card key={city.slug} as="article" className="space-y-4 rounded-3xl">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{city.region}</p>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{city.name}</h2>
                <p className="text-sm leading-7 text-slate-600">{city.heroLead}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${city.slug}`} className="cta-primary">
                  Відкрити місто
                </Link>
                <Link href={`/${city.slug}/guide`} className="cta-secondary">
                  Міський гід
                </Link>
              </div>
            </Card>
          ))}
        </section>

        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Що вам потрібно зараз</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Почніть з конкретної задачі</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Кожен сценарій веде не в абстрактну сторінку, а в наступну корисну дію: гід, оголошення, послуги або події.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {startScenarios.map((scenario) => (
              <Card key={scenario.id} as="article" className="space-y-4 rounded-3xl">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">{scenario.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{scenario.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <Link key={city.slug} href={scenario.href(city.slug)} className="nav-chip">
                      {city.name}
                    </Link>
                  ))}
                </div>
              </Card>
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
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{city.name}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{plan.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{plan.description}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Перший тиждень</h3>
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
      </div>
    </SiteFrame>
  );
}
