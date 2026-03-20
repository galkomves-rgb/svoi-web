import { SiteFrame } from "@/components/layout/site-frame";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { EntitySubmissionForm } from "@/features/submissions/entity-submission-form";

export default function AddListingPage() {
  return (
    <SiteFrame>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Додати оголошення</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">Public listing створюється тільки як submission і проходить moderation queue перед публікацією.</p>
        </section>
        <EntitySubmissionForm moduleKey="listings" cityOptions={cities} categoryOptions={categories.filter((item) => item.module === "listings")} />
      </div>
    </SiteFrame>
  );
}
