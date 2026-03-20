import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { getAdminDashboardData } from "@/server/queries/admin";

export default async function AdminDashboardPage() {
  const { summary } = await getAdminDashboardData();

  return (
    <AdminShell>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Admin dashboard</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Backoffice для редакторів, модераторів і адміністраторів з geo-first контентом.</p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card className="rounded-3xl"><strong>{summary.pendingSubmissions}</strong><p className="mt-2 text-sm text-slate-600">Pending submissions</p></Card>
          <Card className="rounded-3xl"><strong>{summary.openReports}</strong><p className="mt-2 text-sm text-slate-600">Open reports</p></Card>
          <Card className="rounded-3xl"><strong>{summary.publishedListings}</strong><p className="mt-2 text-sm text-slate-600">Published listings</p></Card>
          <Card className="rounded-3xl"><strong>{summary.publishedServices}</strong><p className="mt-2 text-sm text-slate-600">Published services</p></Card>
          <Card className="rounded-3xl"><strong>{summary.upcomingEvents}</strong><p className="mt-2 text-sm text-slate-600">Upcoming events</p></Card>
          <Card className="rounded-3xl"><strong>{summary.publishedGuides}</strong><p className="mt-2 text-sm text-slate-600">Published guides</p></Card>
        </section>
      </div>
    </AdminShell>
  );
}
