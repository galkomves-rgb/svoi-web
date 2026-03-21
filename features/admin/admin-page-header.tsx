type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AdminPageHeader({ eyebrow, title, description }: AdminPageHeaderProps) {
  return (
    <section className="surface-section p-6 lg:p-8">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">{title}</h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
    </section>
  );
}
