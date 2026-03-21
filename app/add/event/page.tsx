import { SiteFrame } from "@/components/layout/site-frame";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { EntitySubmissionForm } from "@/features/submissions/entity-submission-form";

export default function AddEventPage() {
  return (
    <SiteFrame>
      <div className="space-y-6">
        <section className="surface-feature grid gap-4 p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="status-pill">Подання через модерацію</span>
            <span className="status-pill">Події</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 lg:text-[2.4rem]">Додати подію</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600 lg:text-[15px]">
              Вкажіть формат, місто, час і ключовий сенс події. Публікація зʼявиться лише після перевірки модератором.
            </p>
          </div>
        </section>
        <EntitySubmissionForm moduleKey="events" cityOptions={cities} categoryOptions={categories.filter((item) => item.module === "events")} />
      </div>
    </SiteFrame>
  );
}
