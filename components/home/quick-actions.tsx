import Link from "next/link";

type QuickAction = {
  title: string;
  description: string;
  href: string;
  icon?: string;
};

type QuickActionsProps = {
  title: string;
  actions: QuickAction[];
};

export function QuickActions({ title, actions }: QuickActionsProps) {
  return (
    <section className="surface-panel p-4 lg:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Швидкий доступ</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">{title}</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">Короткі точки входу для найчастіших життєвих задач без довгого пошуку по сторінках.</p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="quick-tile"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-lg text-amber-900">
                {action.icon ?? "•"}
              </span>
              <div>
                <strong className="block text-base text-slate-900">{action.title}</strong>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{action.description}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
