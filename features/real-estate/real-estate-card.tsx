import Link from "next/link";
import type { CitySlug } from "@/data/cities";
import type { RealEstateRecord } from "@/types/domain";
import { Card } from "@/components/ui/card";
import { getRealEstateCategoryLabel, getRealEstatePropertyTypeLabel } from "@/lib/site";

export function RealEstateCard({ citySlug, item }: { citySlug: CitySlug; item: RealEstateRecord }) {
  return (
    <Card as="article" className="space-y-4 rounded-3xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-900">{getRealEstateCategoryLabel(item.categorySlug)}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{item.title}</h2>
        </div>
        {item.priceLabel ? (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.priceLabel}</span>
        ) : null}
      </div>

      <p className="text-sm leading-7 text-slate-600">{item.summary}</p>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{getRealEstatePropertyTypeLabel(item.propertyType)}</span>
        {typeof item.bedrooms === "number" ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{item.bedrooms} спальні</span> : null}
        {typeof item.areaSqm === "number" ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{item.areaSqm} м²</span> : null}
        {item.furnished ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Мебльовано</span> : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
            {item.authorType === "business" ? "Бізнес" : "Приватне"}
          </span>
          {item.isVerified ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Перевірено</span> : null}
        </div>

        <Link href={`/${citySlug}/real-estate/${item.slug}`} className="cta-secondary">
          Відкрити обʼєкт
        </Link>
      </div>
    </Card>
  );
}
