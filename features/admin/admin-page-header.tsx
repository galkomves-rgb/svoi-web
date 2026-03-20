type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AdminPageHeader({ eyebrow, title, description }: AdminPageHeaderProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{title}</h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
    </section>
  );
}
