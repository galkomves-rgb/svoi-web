import Link from "next/link";
import type { City } from "@/data/cities";
import { citySections } from "@/lib/site";

type MobileCityNavProps = {
  city: City;
  currentSection: string;
};

export function MobileCityNav({ city, currentSection }: MobileCityNavProps) {
  return (
    <nav aria-label={`Мобільна навігація ${city.name}`} className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {citySections.map((section) => {
        const href = section.href ? `/${city.slug}${section.href}` : `/${city.slug}`;
        const isActive = currentSection === section.key;

        return (
          <Link
            key={section.key}
            href={href}
            className={`shrink-0 ${isActive ? "nav-chip-active" : "nav-chip"}`}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
