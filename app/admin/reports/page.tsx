import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { reports } from "@/data/submissions";

export default function AdminReportsPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Reports manager</h1>
        <div className="grid gap-4">{reports.map((item) => <Card key={item.id} className="rounded-3xl"><strong>{item.reason}</strong><p className="mt-2 text-sm text-slate-600">{item.status}</p></Card>)}</div>
      </div>
    </AdminShell>
  );
}
