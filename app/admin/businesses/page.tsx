import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { businessProfiles } from "@/data/business-profiles";

export default function AdminBusinessesPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Business profiles manager</h1>
        <div className="grid gap-4">{businessProfiles.map((item) => <Card key={item.id} className="rounded-3xl"><strong>{item.name}</strong><p className="mt-2 text-sm text-slate-600">{item.categorySlug}</p></Card>)}</div>
      </div>
    </AdminShell>
  );
}
