import { Card } from "@/components/ui/card";

type AdminStatGridProps = {
  items: Array<{
    label: string;
    value: string | number;
  }>;
};

export function AdminStatGrid({ items }: AdminStatGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="rounded-3xl">
          <strong className="text-3xl text-slate-950">{item.value}</strong>
          <p className="mt-2 text-sm text-slate-600">{item.label}</p>
        </Card>
      ))}
    </section>
  );
}
