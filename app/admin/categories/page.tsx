import { Card } from "@/components/ui/card";
import { AdminShell } from "@/features/admin/admin-shell";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { categories, categorySchemas } from "@/data/categories";
import { getGuideCategoryLabel, getModuleLabel, getServiceCategoryLabel, getEventCategoryLabel, getListingTaxonomyLabel } from "@/lib/site";

export default function AdminCategoriesPage() {
  const getCategoryLabel = (module: string, slug: string) => {
    if (module === "listings") return getListingTaxonomyLabel(slug);
    if (module === "services") return getServiceCategoryLabel(slug);
    if (module === "events") return getEventCategoryLabel(slug);
    if (module === "guides") return getGuideCategoryLabel(slug);
    return slug;
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Системний довідник"
          title="Менеджер категорій"
          description="Таксономії та schema keys формують динамічні форми, фільтри й логіку модерації. Тут важлива не кількість, а цілісність структури."
        />
        <AdminStatGrid
          items={[
            { label: "Таксономій", value: categories.length },
            { label: "Schema keys", value: categorySchemas.length },
            { label: "Модулів із категоріями", value: new Set(categories.map((item) => item.module)).size },
          ]}
        />
        <div className="grid gap-4">
          {categories.map((item) => (
            <Card key={item.id} className="rounded-3xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-900">{getModuleLabel(item.module)}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{getCategoryLabel(item.module, item.slug)}</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.schemaKey}</span>
              </div>
              <div className="mt-4 grid gap-2 text-sm leading-7 text-slate-600 md:grid-cols-2">
                <p>
                  <strong className="text-slate-900">Slug:</strong> {item.slug}
                </p>
                <p>
                  <strong className="text-slate-900">Schema key:</strong> {item.schemaKey}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
