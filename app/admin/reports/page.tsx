import type { ReportRecord } from "@/types/domain";
import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { getAdminDashboardData } from "@/server/queries/admin";

export default async function AdminReportsPage() {
  const { reports } = await getAdminDashboardData();

  return (
    <AdminShell>
      <div className="space-y-6">
        <section className="surface-section p-6 lg:p-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Менеджер скарг</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Скарги повинні працювати як окрема черга довіри: первинний розбір, перевірка і зв&apos;язок з модерацією контенту.</p>
        </section>

        <div className="grid gap-4">
          {reports.map((item: ReportRecord) => (
            <Card key={item.id} className="space-y-3 rounded-3xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <strong className="text-lg text-slate-900">{item.reason}</strong>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{item.status}</span>
              </div>
              <div className="grid gap-2 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Entity:</strong> {item.entityTable}
                </p>
                <p>
                  <strong className="text-slate-900">Entity ID:</strong> {item.entityId}
                </p>
                <p>
                  <strong className="text-slate-900">Створено:</strong> {new Date(item.createdAt).toLocaleString("uk-UA")}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
