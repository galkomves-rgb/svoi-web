import Link from "next/link";
import type { PropsWithChildren } from "react";
import { SiteFrame } from "@/components/layout/site-frame";

const adminLinks = [
  { href: "/admin", label: "Дашборд" },
  { href: "/admin/moderation", label: "Черга модерації" },
  { href: "/admin/listings", label: "Оголошення" },
  { href: "/admin/real-estate", label: "Нерухомість" },
  { href: "/admin/services", label: "Послуги" },
  { href: "/admin/events", label: "Події" },
  { href: "/admin/guides", label: "Гіди" },
  { href: "/admin/categories", label: "Категорії" },
  { href: "/admin/geography", label: "Географія" },
  { href: "/admin/businesses", label: "Бізнес-профілі" },
  { href: "/admin/reports", label: "Скарги" },
  { href: "/admin/search", label: "Пошук" },
];

export function AdminShell({ children }: PropsWithChildren) {
  return (
    <SiteFrame>
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Адмін-панель</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Операційний центр для модерації, редактури, скарг і керування локальним контентом.</p>
          <nav className="mt-4 grid gap-2" aria-label="Навігація адмін-панелі">
            {adminLinks.map((item) => (
              <Link key={item.href} href={item.href} className="nav-chip justify-center">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </SiteFrame>
  );
}
