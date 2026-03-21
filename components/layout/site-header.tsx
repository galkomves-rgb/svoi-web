import Link from "next/link";
import { getCities } from "@/lib/site";
import { SearchInput } from "@/features/shared/ui/search-input";

export function SiteHeader() {
  const cities = getCities();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[rgba(255,250,244,0.92)] backdrop-blur-xl">
      <div className="shell-container py-3">
        <div className="surface-muted px-4 py-4 lg:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="uahub.world головна">
              <span className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-900 px-4 text-sm font-extrabold tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(30,58,138,0.24)]">
                UAHUB
              </span>
              <span className="grid">
                <span className="eyebrow">Платформа спільноти</span>
                <span className="text-sm font-medium text-slate-600">Українці в Іспанії та далі</span>
              </span>
            </Link>

            <div className="ml-auto hidden items-center gap-1 xl:flex">
              <Link href="/start" className="top-link">
                Почати
              </Link>
              <Link href="/search" className="top-link">
                Пошук
              </Link>
              <details className="relative">
                <summary className="nav-chip cursor-pointer list-none">Локації</summary>
                <div className="absolute right-0 mt-3 grid min-w-[220px] gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.1)]">
                  {cities.map((city) => (
                    <Link key={city.slug} href={`/${city.slug}`} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                      {city.name}
                    </Link>
                  ))}
                </div>
              </details>
              <details className="relative">
                <summary className="nav-chip cursor-pointer list-none">Додати</summary>
                <div className="absolute right-0 mt-3 grid min-w-[220px] gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.1)]">
                  <Link href="/add/listing" className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    Додати оголошення
                  </Link>
                  <Link href="/add/service" className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    Додати послугу
                  </Link>
                  <Link href="/add/event" className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    Додати подію
                  </Link>
                </div>
              </details>
              <Link href="/admin" className="nav-chip">
                Адмін
              </Link>
            </div>

            <nav aria-label="Основна навігація" className="flex w-full flex-wrap items-center gap-2 border-t border-slate-200/70 pt-3">
              {[
                { href: "/search?module=listings", label: "Оголошення" },
                { href: "/search?module=real-estate", label: "Нерухомість" },
                { href: "/search?module=services", label: "Послуги" },
                { href: "/search?module=events", label: "Події" },
                { href: "/start", label: "Старт" },
                { href: "/search?module=guides", label: "Гіди" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="nav-chip">
                  {item.label}
                </Link>
              ))}
              <div className="ml-auto hidden min-w-[320px] xl:block">
                <SearchInput action="/search" compact />
              </div>
            </nav>

            <div className="grid w-full gap-3 xl:hidden">
              <SearchInput action="/search" compact />
              <div className="flex flex-wrap gap-2">
                <Link href="/start" className="nav-chip">
                  Почати
                </Link>
                <Link href="/search" className="nav-chip">
                  Пошук
                </Link>
                <Link href="/add/listing" className="nav-chip">
                  Додати
                </Link>
                <Link href="/admin" className="nav-chip">
                  Адмін
                </Link>
                {cities.map((city) => (
                  <Link key={city.slug} href={`/${city.slug}`} className="nav-chip">
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
