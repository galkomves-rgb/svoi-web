import { SiteFrame } from "@/components/layout/site-frame";
import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "1. NIE та базові документи",
    description: "Зрозумійте, який пакет потрібен саме вам і з чого почати запис.",
  },
  {
    title: "2. Житло",
    description: "Подивіться локальні оголошення та перевіряйте договори до будь-якої передоплати.",
  },
  {
    title: "3. Лікар і базові сервіси",
    description: "Знайдіть свій local health flow і збережіть перевірені контакти на випадок потреби.",
  },
  {
    title: "4. Банк, школа, локальні контакти",
    description: "Сформуйте базову опору в місті та не покладайтесь лише на хаотичні чати.",
  },
];

export default function StartPage() {
  return (
    <SiteFrame>
      <section className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Start</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Почати життя в Іспанії без хаосу</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Цей блок збирає базові кроки для тих, хто щойно переїхав і хоче розуміти, що робити далі.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {steps.map((step) => (
            <Card key={step.title} as="article" className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">{step.title}</h2>
              <p className="text-sm leading-7 text-slate-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
