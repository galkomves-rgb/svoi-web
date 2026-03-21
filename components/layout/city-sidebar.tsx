import Link from "next/link";
import type { City } from "@/data/cities";
import { ui } from "@/lib/i18n/ui";
import { citySections } from "@/lib/site";

type CitySidebarProps = {
  city: City;
  currentSection: string;
};

export function CitySidebar({ city, currentSection }: CitySidebarProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 space-y-4 rounded-[1.75rem] border border-white/70 bg-white/86 p-4 shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
        <div className="space-y-2 rounded-[1.25rem] bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 px-4 py-4 text-white">
          <p className="eyebrow-light">{ui.cityNav.context}</p>
          <h2 className="text-xl font-semibold tracking-tight">{city.name}</h2>
          <p className="text-sm leading-6 text-blue-100/90">
            {city.region}, {city.country}
          </p>
        </div>

        <div className="space-y-2">
          <p className="px-1 eyebrow-muted">{ui.cityNav.sections}</p>
          <nav aria-label={`${ui.cityNav.sidebarAriaPrefix} ${city.name}`} className="grid gap-1.5">
            {citySections.map((section) => {
              const href = section.href ? `/${city.slug}${section.href}` : `/${city.slug}`;
              const isActive = currentSection === section.key;

              return (
                <Link key={section.key} href={href} className={isActive ? "sidebar-link-active" : "sidebar-link"}>
                  <span>{section.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="surface-muted px-4 py-4">
          <p className="eyebrow">{ui.cityNav.quickFocus}</p>
          <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
            <p>{ui.cityNav.quickFocusText}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
