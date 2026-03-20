import type { SearchFilters } from "@/server/repositories/content-repository";

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
            <input type="text" name="city" defaultValue={defaultValues?.citySlug ?? ""} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Модуль</span>
            <input type="text" name="module" defaultValue={defaultValues?.module ?? ""} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Категорія</span>
            <input type="text" name="category" defaultValue={defaultValues?.categorySlug ?? ""} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Автор</span>
            <input type="text" name="authorType" defaultValue={defaultValues?.authorType ?? ""} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
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
