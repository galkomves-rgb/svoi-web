import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { getSearchResults } from "@/server/queries/public";

export default async function AdminSearchPage() {
  const results = await getSearchResults({ query: "" });

  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Адміністрування пошуку</h1>
        <Card className="rounded-3xl">
          <strong>{results.length}</strong>
          <p className="mt-2 text-sm text-slate-600">Проіндексовані публічні записи в поточному резервному репозиторії даних</p>
        </Card>
      </div>
    </AdminShell>
  );
}
