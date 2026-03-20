import Link from "next/link";
import type { City } from "@/data/cities";

type HeroProps = {
  title: string;
  lead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  cityCards?: City[];
};

export function Hero({ title, lead, primary, secondary, cityCards = [] }: HeroProps) {
  return (
    <section
      className={`grid gap-6 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8 ${
        cityCards.length ? "lg:grid-cols-[minmax(0,1.35fr)_320px]" : ""
      }`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">uahub.world Costa Blanca</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{lead}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={primary.href} className="cta-primary">
            {primary.label}
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="cta-secondary">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>

      {cityCards.length ? (
        <aside className="rounded-3xl bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Почати з міста</p>
          <div className="mt-4 grid gap-3">
            {cityCards.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                <strong className="block text-base text-slate-900">{city.name}</strong>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{city.heroLead}</span>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </section>
  );
}
