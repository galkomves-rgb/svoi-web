import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  subtitle?: string;
  eyebrow?: string;
};

export function SectionHeading({ title, subtitle, actionHref, actionLabel, eyebrow }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1.5">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">{title}</h2>
        {subtitle ? <p className="max-w-2xl text-sm leading-7 text-slate-600">{subtitle}</p> : null}
      </div>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="cta-secondary">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
