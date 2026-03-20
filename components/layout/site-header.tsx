import Link from "next/link";
import { getCities } from "@/lib/site";

export function SiteHeader() {
  const cities = getCities();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-amber-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4 lg:px-6">
        <Link href="/" className="inline-flex items-center gap-3" aria-label="uahub.world головна">
          <span className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-900 px-4 text-sm font-extrabold tracking-[0.12em] text-white">
            UAHUB
          </span>
          <span className="hidden text-sm font-medium text-slate-600 sm:block">Платформа спільноти Costa Blanca</span>
        </Link>

        <nav aria-label="Основна навігація" className="ml-auto flex flex-wrap items-center gap-2">
          <Link href="/start" className="nav-chip">
            Start
          </Link>
          {cities.map((city) => (
            <Link key={city.slug} href={`/${city.slug}`} className="nav-chip">
              {city.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
