import Link from "next/link";
import type { PropsWithChildren } from "react";
import { SiteFrame } from "@/components/layout/site-frame";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/moderation", label: "Moderation queue" },
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/guides", label: "Guides" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/geography", label: "Geography" },
  { href: "/admin/businesses", label: "Business profiles" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/search", label: "Search admin" },
];

export function AdminShell({ children }: PropsWithChildren) {
  return (
    <SiteFrame>
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Backoffice</p>
          <nav className="mt-4 grid gap-2" aria-label="Admin navigation">
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
