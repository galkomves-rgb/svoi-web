import type { SearchFilters } from "@/server/repositories/content-repository";
import { cities } from "@/data/cities";
import { getSearchCategoryGroups, searchAuthorLabels, searchModuleLabels } from "@/lib/site";

type SearchInputProps = {
  action?: string;
  defaultValues?: SearchFilters;
  compact?: boolean;
};

export function SearchInput({ action = "/search", defaultValues, compact = false }: SearchInputProps) {
  const searchCategoryGroups = getSearchCategoryGroups();

  return (
    <form action={action} className={compact ? "grid gap-2 md:grid-cols-[minmax(0,1fr)_auto]" : "control-panel grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_repeat(5,minmax(0,1fr))_auto]"}>
      <label className="grid gap-2">
        <span className={compact ? "sr-only" : "field-label"}>{compact ? "Глобальний пошук" : "Пошук"}</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultValues?.query ?? ""}
          placeholder="NIE, житло, лікар, переклад, подія..."
          className={compact ? "input-shell h-10 rounded-full px-4 text-sm" : "input-shell"}
        />
      </label>

      {!compact ? (
        <>
          <label className="grid gap-2">
            <span className="field-label">Місто</span>
            <select name="city" defaultValue={defaultValues?.citySlug ?? ""} className="select-shell">
              <option value="">Усі міста</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="field-label">Модуль</span>
            <select name="module" defaultValue={defaultValues?.module ?? ""} className="select-shell">
              {Object.entries(searchModuleLabels).map(([value, label]) => (
                <option key={value} value={value === "all" ? "" : value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="field-label">Категорія</span>
            <select
              name="category"
              defaultValue={defaultValues?.categorySlug ?? ""}
              className="select-shell"
            >
              <option value="">Усі категорії</option>
              {searchCategoryGroups.map((group) => (
                <optgroup key={group.module} label={group.label}>
                  {group.options.map((option) => (
                    <option key={`${group.module}-${option.value}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="field-label">Автор</span>
            <select name="authorType" defaultValue={defaultValues?.authorType ?? ""} className="select-shell">
              {Object.entries(searchAuthorLabels).map(([value, label]) => (
                <option key={value} value={value === "all" ? "" : value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="field-label">Тип</span>
            <select name="business" defaultValue={defaultValues?.business ?? "all"} className="select-shell">
              <option value="all">Усі</option>
              <option value="business">Бізнес</option>
              <option value="private">Приватні</option>
            </select>
          </label>
        </>
      ) : null}

      <button type="submit" className={compact ? "cta-primary h-10 rounded-full px-4 self-end" : "cta-primary self-end"}>
        Знайти
      </button>
    </form>
  );
}
