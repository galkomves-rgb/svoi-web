import { SiteFrame } from "@/components/layout/site-frame";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { EntitySubmissionForm } from "@/features/submissions/entity-submission-form";

export default function AddServicePage() {
  return (
    <SiteFrame>
      <div className="section-stack">
        <section className="surface-feature grid gap-4 p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="status-pill">Подання через модерацію</span>
            <span className="status-pill">Сервіси</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 lg:text-[2.4rem]">Додати сервіс</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600 lg:text-[15px]">
              Додайте послугу, бізнес або організаційну пропозицію з коректним типом автора, містом і способом контакту.
            </p>
          </div>
        </section>
        <EntitySubmissionForm moduleKey="services" cityOptions={cities} categoryOptions={categories.filter((item) => item.module === "services")} />
      </div>
    </SiteFrame>
  );
}
