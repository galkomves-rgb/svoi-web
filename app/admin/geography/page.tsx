import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { cities, countries, districts, regions } from "@/data/geography";

export default function AdminGeographyPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Системний довідник"
          title="Менеджер географії"
          description="Geo-first модель має залишатися чистою: країни, регіони, міста і райони не повинні дублюватися або розходитися між модулями."
        />
        <AdminStatGrid
          items={[
            { label: "Країн", value: countries.length },
            { label: "Регіонів", value: regions.length },
            { label: "Міст", value: cities.length },
            { label: "Районів", value: districts.length },
          ]}
        />
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cities.map((city) => (
            <Card key={city.id} className="rounded-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-900">{city.slug}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{city.name}</h2>
              <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Країна:</strong> {countries.find((item) => item.slug === city.countrySlug)?.name ?? city.countrySlug}
                </p>
                <p>
                  <strong className="text-slate-900">Регіон:</strong> {regions.find((item) => item.slug === city.regionSlug)?.name ?? city.regionSlug}
                </p>
                <p>
                  <strong className="text-slate-900">Районів:</strong> {districts.filter((item) => item.citySlug === city.slug).length}
                </p>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </AdminShell>
  );
}
