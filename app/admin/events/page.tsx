import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { events } from "@/data/events";

export default function AdminEventsPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Events manager</h1>
        <div className="grid gap-4">{events.map((item) => <Card key={item.id} className="rounded-3xl"><strong>{item.title}</strong><p className="mt-2 text-sm text-slate-600">{item.categorySlug}</p></Card>)}</div>
      </div>
    </AdminShell>
  );
}
