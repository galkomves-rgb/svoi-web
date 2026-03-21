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
    <section className="surface-panel p-3.5 lg:p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Швидкий доступ</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-900 lg:text-xl">{title}</h2>
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
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-base text-amber-900">
                {action.icon ?? "•"}
              </span>
              <div>
                <strong className="block text-sm text-slate-900 lg:text-[15px]">{action.title}</strong>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{action.description}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
