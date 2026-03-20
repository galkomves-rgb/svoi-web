import Link from "next/link";

type QuickAction = {
  title: string;
  description: string;
  href: string;
};

type QuickActionsProps = {
  title: string;
  actions: QuickAction[];
};

export function QuickActions({ title, actions }: QuickActionsProps) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-soft">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            <strong className="block text-base text-slate-900">{action.title}</strong>
            <span className="mt-2 block text-sm leading-6 text-slate-600">{action.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
