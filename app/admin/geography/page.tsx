import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { cities, countries, districts, regions } from "@/data/geography";

export default function AdminGeographyPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Geography manager</h1>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-3xl"><strong>{countries.length}</strong><p className="mt-2 text-sm text-slate-600">Countries</p></Card>
          <Card className="rounded-3xl"><strong>{regions.length}</strong><p className="mt-2 text-sm text-slate-600">Regions</p></Card>
          <Card className="rounded-3xl"><strong>{cities.length}</strong><p className="mt-2 text-sm text-slate-600">Cities</p></Card>
          <Card className="rounded-3xl"><strong>{districts.length}</strong><p className="mt-2 text-sm text-slate-600">Districts</p></Card>
        </div>
      </div>
    </AdminShell>
  );
}
