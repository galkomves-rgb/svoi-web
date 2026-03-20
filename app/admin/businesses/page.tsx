import { AdminShell } from "@/features/admin/admin-shell";
import { businessProfiles } from "@/data/business-profiles";
import { AdminEntityCard } from "@/features/admin/admin-entity-card";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminStatGrid } from "@/features/admin/admin-stat-grid";
import { StatusBadge } from "@/features/shared/ui/status-badge";
import { getCityNameBySlug, getServiceCategoryLabel } from "@/lib/site";

export default function AdminBusinessesPage() {
  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminPageHeader
          eyebrow="Комерційний шар"
          title="Менеджер бізнес-профілів"
          description="Бізнес-профіль має бути окремим довірчим об'єктом: верифікація, географія, категорія і зв'язок із сервісами."
        />
        <AdminStatGrid
          items={[
            { label: "Усього профілів", value: businessProfiles.length },
            { label: "Перевірених", value: businessProfiles.filter((item) => item.isVerified).length },
            { label: "Публічних", value: businessProfiles.filter((item) => item.visibility === "public").length },
          ]}
        />
        <div className="grid gap-4">
          {businessProfiles.map((item) => (
            <AdminEntityCard
              key={item.id}
              eyebrow={getServiceCategoryLabel(item.categorySlug)}
              title={item.name}
              summary={item.summary}
              badges={<StatusBadge status={item.status} visibility={item.visibility} />}
              meta={[
                { label: "Місто", value: getCityNameBySlug(item.citySlug) },
                { label: "Контакт", value: item.contactLabel },
                { label: "Сайт", value: item.websiteUrl ?? "Не вказано" },
                { label: "Перевірка", value: item.isVerified ? "Так" : "Ні" },
              ]}
            />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
