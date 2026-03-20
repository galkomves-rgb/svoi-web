import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { categories, categorySchemas } from "@/data/categories";

export default function AdminCategoriesPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Categories manager</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-3xl"><strong>{categories.length}</strong><p className="mt-2 text-sm text-slate-600">Taxonomy categories</p></Card>
          <Card className="rounded-3xl"><strong>{categorySchemas.length}</strong><p className="mt-2 text-sm text-slate-600">Category schemas</p></Card>
        </div>
      </div>
    </AdminShell>
  );
}
