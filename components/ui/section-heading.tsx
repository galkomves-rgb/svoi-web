type SectionHeadingProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle, actionHref, actionLabel }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p> : null}
      </div>
      {actionHref && actionLabel ? (
        <a
          href={actionHref}
          className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100"
        >
          {actionLabel}
        </a>
      ) : null}
    </div>
  );
}
