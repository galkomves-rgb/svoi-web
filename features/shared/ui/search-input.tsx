import type { SearchFilters } from "@/server/repositories/content-repository";
import { cities } from "@/data/cities";
import { searchAuthorLabels, searchModuleLabels } from "@/lib/site";

type SearchInputProps = {
  action?: string;
  defaultValues?: SearchFilters;
  compact?: boolean;
};

export function SearchInput({ action = "/search", defaultValues, compact = false }: SearchInputProps) {
  return (
    <form action={action} className={`grid gap-3 ${compact ? "md:grid-cols-[minmax(0,1fr)_auto]" : "md:grid-cols-[2fr_repeat(5,minmax(0,1fr))_auto]"}`}>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">{compact ? "Глобальний пошук" : "Пошук"}</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultValues?.query ?? ""}
          placeholder="NIE, житло, лікар, переклад, подія..."
          className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300"
        />
      </label>

      {!compact ? (
        <>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Місто</span>
            <select name="city" defaultValue={defaultValues?.citySlug ?? ""} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
              <option value="">Усі міста</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Модуль</span>
            <select name="module" defaultValue={defaultValues?.module ?? ""} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
              {Object.entries(searchModuleLabels).map(([value, label]) => (
                <option key={value} value={value === "all" ? "" : value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Категорія</span>
            <input
              type="text"
              name="category"
              defaultValue={defaultValues?.categorySlug ?? ""}
              placeholder="legal, meetup, documents..."
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Автор</span>
            <select name="authorType" defaultValue={defaultValues?.authorType ?? ""} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
              {Object.entries(searchAuthorLabels).map(([value, label]) => (
                <option key={value} value={value === "all" ? "" : value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Тип</span>
            <select name="business" defaultValue={defaultValues?.business ?? "all"} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
              <option value="all">Усі</option>
              <option value="business">Бізнес</option>
              <option value="private">Приватні</option>
            </select>
          </label>
        </>
      ) : null}

      <button type="submit" className="cta-primary self-end">
        Знайти
      </button>
    </form>
  );
}
