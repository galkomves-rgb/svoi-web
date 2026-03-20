import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { ModerationActions } from "@/features/shared/ui/moderation-actions";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getAdminDashboardData } from "@/server/queries/admin";

export default async function AdminModerationPage() {
  const { submissions } = await getAdminDashboardData();

  return (
    <AdminShell>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Moderation queue</h1>
        </section>
        <section className="grid gap-4">
          {submissions.map((submission) => (
            <Card key={submission.id} as="article" className="space-y-4 rounded-3xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-900">{submission.module}</p>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{submission.title}</h2>
                </div>
                <StatusBadge status={submission.status} />
              </div>
              <p className="text-sm leading-7 text-slate-600">{submission.summary}</p>
              <ModerationActions entityTable="submissions" entityId={submission.id} />
            </Card>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
