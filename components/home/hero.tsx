import Link from "next/link";
import type { City } from "@/data/cities";

type HeroProps = {
  title: string;
  lead: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  cityCards?: City[];
  highlights?: string[];
  eyebrow?: string;
};

export function Hero({ title, lead, primary, secondary, cityCards = [], highlights = [], eyebrow = "uahub.world" }: HeroProps) {
  return (
    <section
      className={`surface-feature grid gap-5 p-5 lg:p-6 ${
        cityCards.length || highlights.length ? "lg:grid-cols-[minmax(0,1.4fr)_320px]" : ""
      }`}
    >
      <div className="space-y-5">
        <div className="space-y-3">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl xl:text-[3.2rem]">{title}</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 lg:text-lg">{lead}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={primary.href} className="cta-primary">
            {primary.label}
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="cta-tertiary">
              {secondary.label}
            </Link>
          ) : null}
        </div>

        {cityCards.length ? (
          <div className="flex flex-wrap gap-2">
            {cityCards.map((city) => (
              <Link key={city.slug} href={`/${city.slug}`} className="nav-chip">
                {city.name}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {highlights.length || cityCards.length ? (
        <aside className="surface-muted p-5">
          <p className="eyebrow">Що тут працює</p>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
            {highlights.map((item) => (
              <div key={item} className="flex gap-2">
                <span className="text-blue-900">•</span>
                <span>{item}</span>
              </div>
            ))}
            {!highlights.length && cityCards.length
              ? cityCards.map((city) => (
                  <Link key={city.slug} href={`/${city.slug}`} className="rounded-2xl border border-white/80 bg-white/90 px-4 py-3 font-medium text-slate-700 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                    {city.name}
                  </Link>
                ))
              : null}
          </div>
        </aside>
      ) : null}
    </section>
  );
}
