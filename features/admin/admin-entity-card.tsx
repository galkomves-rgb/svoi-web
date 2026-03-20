import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type AdminEntityCardProps = {
  eyebrow: string;
  title: string;
  summary: string;
  badges?: ReactNode;
  meta?: Array<{
    label: string;
    value: string | number | null | undefined;
  }>;
  footer?: ReactNode;
};

export function AdminEntityCard({
  eyebrow,
  title,
  summary,
  badges,
  meta = [],
  footer,
}: AdminEntityCardProps) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-900">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        </div>
        {badges}
      </div>

      <p className="text-sm leading-7 text-slate-600">{summary}</p>

      {meta.length ? (
        <div className="grid gap-2 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600 md:grid-cols-2">
          {meta.map((item) => (
            <p key={item.label}>
              <strong className="text-slate-900">{item.label}:</strong> {item.value ?? "—"}
            </p>
          ))}
        </div>
      ) : null}

      {footer ? <div className="flex flex-wrap items-center gap-3">{footer}</div> : null}
    </Card>
  );
}
