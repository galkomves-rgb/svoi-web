import Link from "next/link";
import type { ReactNode } from "react";

type CatalogPanelAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type CatalogControlPanelProps = {
  title?: string;
  description?: string;
  resultsLabel: string;
  resultsValue: number;
  viewLinks: Array<{
    label: string;
    href: string;
    active: boolean;
  }>;
  clearHref?: string;
  summary?: string[];
  primaryAction?: CatalogPanelAction;
  secondaryAction?: CatalogPanelAction;
  children: ReactNode;
};

const getActionClassName = (variant: CatalogPanelAction["variant"] = "secondary") =>
  variant === "primary" ? "cta-primary" : "cta-secondary";

export function CatalogControlPanel({
  title,
  description,
  resultsLabel,
  resultsValue,
  viewLinks,
  clearHref,
  summary = [],
  primaryAction,
  secondaryAction,
  children,
}: CatalogControlPanelProps) {
  return (
    <section className="sticky top-24 z-20 space-y-3">
      <div className="control-panel space-y-4 backdrop-blur">
        <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-2">
            {title ? <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2> : null}
            {description ? <p className="text-sm leading-7 text-slate-600">{description}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <span className="status-pill">
              {resultsLabel}: <strong className="ml-1 text-slate-900">{resultsValue}</strong>
            </span>
            {summary.map((item) => (
              <span key={item} className="status-pill bg-amber-50 text-amber-900">
                {item}
              </span>
            ))}
          </div>
        </div>

        {children}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-3">
          <div className="flex flex-wrap gap-2" aria-label="Режим відображення">
            {viewLinks.map((item) => (
              <Link key={item.href} href={item.href} className={item.active ? "nav-chip-active" : "nav-chip"}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {secondaryAction ? (
              <Link href={secondaryAction.href} className={getActionClassName(secondaryAction.variant)}>
                {secondaryAction.label}
              </Link>
            ) : null}
            {clearHref ? (
              <Link href={clearHref} className="cta-secondary">
                Очистити фільтри
              </Link>
            ) : null}
            {primaryAction ? (
              <Link href={primaryAction.href} className={getActionClassName(primaryAction.variant)}>
                {primaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
