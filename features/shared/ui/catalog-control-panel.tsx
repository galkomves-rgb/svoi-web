import Link from "next/link";
import type { ReactNode } from "react";

type CatalogControlPanelProps = {
  resultsLabel: string;
  resultsValue: number;
  viewLinks: Array<{
    label: string;
    href: string;
    active: boolean;
  }>;
  clearHref?: string;
  summary?: string[];
  children: ReactNode;
};

export function CatalogControlPanel({
  resultsLabel,
  resultsValue,
  viewLinks,
  clearHref,
  summary = [],
  children,
}: CatalogControlPanelProps) {
  return (
    <section className="sticky top-24 z-20 space-y-3">
      <div className="control-panel space-y-4 backdrop-blur">
        {children}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="status-pill">
              {resultsLabel}: <strong className="ml-1 text-slate-900">{resultsValue}</strong>
            </span>
            {summary.map((item) => (
              <span key={item} className="status-pill bg-amber-50 text-amber-900">
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2" aria-label="Режим відображення">
              {viewLinks.map((item) => (
                <Link key={item.href} href={item.href} className={item.active ? "nav-chip-active" : "nav-chip"}>
                  {item.label}
                </Link>
              ))}
            </div>

            {clearHref ? (
              <Link href={clearHref} className="cta-secondary">
                Очистити фільтри
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
