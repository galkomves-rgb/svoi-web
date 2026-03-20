import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { services } from "@/data/services";

export default function AdminServicesPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Services manager</h1>
        <div className="grid gap-4">{services.map((item) => <Card key={item.id} className="rounded-3xl"><strong>{item.title}</strong><p className="mt-2 text-sm text-slate-600">{item.categorySlug}</p></Card>)}</div>
      </div>
    </AdminShell>
  );
}
