import Link from "next/link";
import { AdminShell } from "@/features/admin/admin-shell";
import { Card } from "@/components/ui/card";
import { AdminFilterLinks } from "@/features/admin/admin-filter-links";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { getAdminDashboardData } from "@/server/queries/admin";

export default async function AdminDashboardPage() {
  const { summary, submissions, reports, cities, categories } = await getAdminDashboardData();

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Операційний центр"
          title="Дашборд адмін-панелі"
          description="Адмінська частина повинна давати не просто доступ до сторінок, а чіткий фокус: що треба перевірити, де є ризики і які модулі зараз потребують дії."
        />

        <AdminStatGrid
          items={[
            { label: "Очікують модерації", value: summary.pendingSubmissions },
            { label: "Відкриті скарги", value: summary.openReports },
            { label: "Опубліковані оголошення", value: summary.publishedListings },
            { label: "Опубліковані послуги", value: summary.publishedServices },
            { label: "Актуальні події", value: summary.upcomingEvents },
            { label: "Опубліковані гіди", value: summary.publishedGuides },
          ]}
        />

        <section className="space-y-2">
          <p className="text-sm font-semibold text-slate-900">Швидкі переходи</p>
          <AdminFilterLinks
            items={[
              { label: "Черга модерації", href: "/admin/moderation", active: false },
              { label: "Оголошення", href: "/admin/listings", active: false },
              { label: "Послуги", href: "/admin/services", active: false },
              { label: "Події", href: "/admin/events", active: false },
              { label: "Гіди", href: "/admin/guides", active: false },
              { label: "Скарги", href: "/admin/reports", active: false },
            ]}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
          <Card as="section" className="space-y-4 rounded-3xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Потрібно зараз</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Операційний фокус</h2>
              </div>
              <Link href="/admin/moderation" className="cta-secondary">
                Відкрити чергу
              </Link>
            </div>
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>
                <strong className="text-slate-900">Подачі:</strong> {submissions.length} записів у поточній черзі.
              </p>
              <p>
                <strong className="text-slate-900">Скарги:</strong> {reports.length} записів потребують перегляду або первинного розбору.
              </p>
              <p>
                <strong className="text-slate-900">Покриття:</strong> {cities.length} міст і {categories.length} категорій уже заведені в систему.
              </p>
            </div>
          </Card>

          <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Принцип роботи</p>
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>У backoffice нічого не має публікуватися напряму без контрольованого статусного переходу.</p>
              <p>Черга модерації, скарги та менеджери модулів мають бути однією системою, а не набором розрізнених сторінок.</p>
            </div>
          </Card>
        </section>
      </div>
    </AdminShell>
  );
}
