import Link from "next/link";
import type { City } from "@/data/cities";
import { citySections } from "@/lib/site";

type CitySidebarProps = {
  city: City;
  currentSection: string;
};

export function CitySidebar({ city, currentSection }: CitySidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-4 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-soft">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Локація</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{city.name}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {city.region}, {city.country}
          </p>
        </div>

        <nav aria-label={`Навігація по ${city.name}`} className="grid gap-2">
          {citySections.map((section) => {
            const href = section.href ? `/${city.slug}${section.href}` : `/${city.slug}`;
            const isActive = currentSection === section.key;

            return (
              <Link
                key={section.key}
                href={href}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? "bg-blue-900 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {section.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
