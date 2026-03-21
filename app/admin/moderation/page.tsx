import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { ModerationActions } from "@/features/shared/ui/moderation-actions";
import { AuthorBadge } from "@/features/shared/ui/author-badge";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityNameBySlug, getModuleCategoryLabel, getModuleLabel } from "@/lib/site";
import { getAdminDashboardData } from "@/server/queries/admin";
import type { SubmissionRecord } from "@/types/domain";

export default async function AdminModerationPage() {
  const { submissions } = await getAdminDashboardData();
  const grouped = {
    pending_review: submissions.filter((item: SubmissionRecord) => item.status === "pending_review"),
    changes_requested: submissions.filter((item: SubmissionRecord) => item.status === "changes_requested"),
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <section className="surface-section p-6 lg:p-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Черга модерації</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Черга має показувати не просто список, а статус, автора, географію й наступну допустиму дію.</p>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-3xl">
            <strong className="text-3xl text-slate-950">{grouped.pending_review.length}</strong>
            <p className="mt-2 text-sm text-slate-600">Очікують перевірки</p>
          </Card>
          <Card className="rounded-3xl">
            <strong className="text-3xl text-slate-950">{grouped.changes_requested.length}</strong>
            <p className="mt-2 text-sm text-slate-600">Повернуті на зміни</p>
          </Card>
        </section>

        <section className="space-y-6">
          {[
            { title: "Очікують перевірки", items: grouped.pending_review },
            { title: "Повернуті на доопрацювання", items: grouped.changes_requested },
          ].map((group) => (
            <div key={group.title} className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{group.title}</h2>
              {group.items.length ? (
                <div className="grid gap-4">
                  {group.items.map((submission: SubmissionRecord) => (
                    <Card key={submission.id} as="article" className="space-y-4 rounded-3xl">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="eyebrow">{getModuleLabel(submission.module)}</p>
                          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{submission.title}</h3>
                        </div>
                        <StatusBadge status={submission.status} />
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <AuthorBadge authorType={submission.authorType} />
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{getCityNameBySlug(submission.citySlug)}</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{getModuleCategoryLabel(submission.module, submission.categorySlug)}</span>
                      </div>

                      <p className="text-sm leading-7 text-slate-600">{submission.summary}</p>

                      <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
                        <strong className="text-slate-900">Попередній перегляд даних:</strong>
                        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs leading-6 text-slate-600">
                          {JSON.stringify(submission.payload, null, 2)}
                        </pre>
                      </div>

                      <ModerationActions entityTable="submissions" entityId={submission.id} currentStatus={submission.status} />
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="rounded-3xl bg-slate-50">
                  <p className="text-sm leading-7 text-slate-600">У цьому сегменті черга поки порожня.</p>
                </Card>
              )}
            </div>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
