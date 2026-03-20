import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { guides } from "@/data/guides";

export default function AdminGuidesPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Guides manager</h1>
        <div className="grid gap-4">{guides.map((item) => <Card key={item.id} className="rounded-3xl"><strong>{item.title}</strong><p className="mt-2 text-sm text-slate-600">{item.categorySlug}</p></Card>)}</div>
      </div>
    </AdminShell>
  );
}
