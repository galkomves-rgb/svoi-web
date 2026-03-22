import Link from "next/link";
import { getCities } from "@/lib/site";
import { ui } from "@/lib/i18n/ui";
import { SearchInput } from "@/features/shared/ui/search-input";
import { HeaderMenu } from "./header-menu";

export function SiteHeader() {
  const cities = getCities();
  const locationItems = cities.map((city) => ({
    href: `/${city.slug}`,
    label: city.name,
  }));
  const addItems = [
    { href: "/add/listing", label: "Додати оголошення" },
    { href: "/add/service", label: "Додати послугу" },
    { href: "/add/event", label: "Додати подію" },
  ];
  const primaryNavItems = [
    { href: "/search?module=listings", label: ui.header.nav.listings },
    { href: "/search?module=real-estate", label: ui.header.nav.realEstate },
    { href: "/search?module=services", label: ui.header.nav.services },
    { href: "/search?module=events", label: ui.header.nav.events },
    { href: "/start", label: ui.header.nav.start },
    { href: "/search?module=guides", label: ui.header.nav.guides },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[rgba(255,250,244,0.88)] backdrop-blur-xl">
      <a href="#main-content" className="sr-only absolute left-4 top-4 z-50 rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:outline-none focus:ring-4 focus:ring-blue-200">
        Перейти до основного контенту
      </a>
      <div className="shell-container py-2.5">
        <div className="surface-muted px-3.5 py-3 lg:px-4 lg:py-3.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="uahub.world головна">
              <span className="inline-flex h-10 items-center justify-center rounded-2xl bg-blue-900 px-3.5 text-sm font-extrabold tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(30,58,138,0.24)]">
                UAHUB
              </span>
              <span className="grid">
                <span className="eyebrow">{ui.header.platformTagline}</span>
                <span className="text-sm font-medium text-slate-600">{ui.header.platformSubtitle}</span>
              </span>
            </Link>

            <div className="ml-auto hidden items-center gap-2 xl:flex">
              <div className="min-w-[280px] max-w-[360px] flex-1">
                <SearchInput action="/search" compact />
              </div>
              <Link href="/start" className="top-link">
                {ui.header.start}
              </Link>
              <HeaderMenu label={ui.header.locations} items={locationItems} />
              <HeaderMenu label={ui.header.add} items={addItems} />
              <Link href="/admin" className="nav-chip">
                {ui.header.admin}
              </Link>
            </div>

            <nav aria-label="Основна навігація" className="flex w-full items-center gap-2 overflow-x-auto border-t border-slate-200/70 pt-2.5 pb-1 md:flex-wrap md:overflow-visible md:pb-0">
              {primaryNavItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-chip">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="grid w-full gap-2.5 xl:hidden">
              <SearchInput action="/search" compact />
              <div className="flex flex-wrap gap-2">
                <Link href="/start" className="nav-chip">
                  {ui.header.start}
                </Link>
                <HeaderMenu label={ui.header.locations} items={locationItems} />
                <HeaderMenu label={ui.header.add} items={addItems} />
                <Link href="/admin" className="nav-chip">
                  {ui.header.admin}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
