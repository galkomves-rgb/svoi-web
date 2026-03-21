"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitModeratedContent } from "@/server/actions/submissions";
import { buildSubmissionSchema, getCategorySchemaDefinition } from "@/schemas/category-schemas";
import type { City } from "@/data/cities";
import { businessProfiles } from "@/data/business-profiles";
import type { CategoryDefinition } from "@/types/domain";
import type { GenericSubmissionInput } from "@/schemas/category-schemas";
import {
  getEventCategoryLabel,
  getGuideCategoryLabel,
  getListingTaxonomyLabel,
  getServiceCategoryLabel,
} from "@/lib/site";

type SubmissionFormProps = {
  moduleKey: "listings" | "services" | "events";
  cityOptions: City[];
  categoryOptions: CategoryDefinition[];
  defaultCitySlug?: string;
};

export function EntitySubmissionForm({ moduleKey, cityOptions, categoryOptions, defaultCitySlug }: SubmissionFormProps) {
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const fallbackCategory = categoryOptions[0];
  const [selectedCategory, setSelectedCategory] = useState(fallbackCategory?.slug ?? "");
  const schemaKey = categoryOptions.find((item) => item.slug === selectedCategory)?.schemaKey ?? fallbackCategory?.schemaKey ?? "";
  const definition = getCategorySchemaDefinition(schemaKey);
  const formSchema = useMemo(() => buildSubmissionSchema(schemaKey), [schemaKey]);

  const getCategoryLabel = (category: CategoryDefinition) => {
    if (category.module === "listings") return getListingTaxonomyLabel(category.slug);
    if (category.module === "services") return getServiceCategoryLabel(category.slug);
    if (category.module === "events") return getEventCategoryLabel(category.slug);
    if (category.module === "guides") return getGuideCategoryLabel(category.slug);
    return category.label;
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      body: "",
      categorySlug: selectedCategory,
      authorType: "private_person",
      businessProfileSlug: "",
      countrySlug: "spain",
      regionSlug: "valencia",
      citySlug: defaultCitySlug ?? cityOptions[0]?.slug ?? "torrevieja",
      districtSlug: "",
      geoScopeType: "city",
      addressText: "",
      latitude: undefined,
      longitude: undefined,
      googlePlaceId: "",
    },
  });
  const selectedAuthorType = form.watch("authorType");
  const selectedCitySlug = form.watch("citySlug");
  const selectedGeoScope = form.watch("geoScopeType");
  const watchedTitle = form.watch("title");
  const watchedSummary = form.watch("summary");
  const watchedAddress = form.watch("addressText");
  const selectedCityName = cityOptions.find((city) => city.slug === selectedCitySlug)?.name ?? cityOptions[0]?.name ?? "Торревʼєха";
  const selectedCategoryDefinition = categoryOptions.find((item) => item.slug === selectedCategory) ?? fallbackCategory;
  const selectedCategoryLabel = selectedCategoryDefinition ? getCategoryLabel(selectedCategoryDefinition) : "Не вибрано";
  const authorTypeOptions = [
    { value: "private_person", label: "Приватна особа" },
    { value: "business", label: "Бізнес" },
    { value: "community_org", label: "Організація" },
  ] as const;
  const geoScopeOptions = [
    { value: "city", label: "Місто" },
    { value: "district", label: "Район" },
    { value: "region", label: "Регіон" },
  ] as const;
  const schemaOptionLabels: Record<string, string> = {
    "full-time": "Повна зайнятість",
    "part-time": "Часткова зайнятість",
    project: "Проєктна робота",
  };
  const moduleTitle =
    moduleKey === "listings" ? "Оголошення" : moduleKey === "services" ? "Сервіс" : "Подія";
  const moduleLandingHref = moduleKey === "listings" ? `/${selectedCitySlug}/listings` : moduleKey === "services" ? `/${selectedCitySlug}/services` : `/${selectedCitySlug}/events`;
  const moduleLandingLabel = moduleKey === "listings" ? "Відкрити каталог оголошень" : moduleKey === "services" ? "Відкрити каталог сервісів" : "Відкрити каталог подій";
  const stepOneReady = Boolean(watchedTitle?.trim() && watchedSummary?.trim() && selectedCategory);
  const stepTwoReady = Boolean(selectedCitySlug && selectedAuthorType);
  const stepThreeReady = Boolean(definition ? watchedAddress?.trim() || selectedGeoScope : true);

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const response = await submitModeratedContent(moduleKey, schemaKey, {
        ...values,
        categorySlug: selectedCategory,
      } as GenericSubmissionInput);
      setResultMessage(response.status);
      form.reset({
        title: "",
        summary: "",
        body: "",
        categorySlug: selectedCategory,
        authorType: "private_person",
        businessProfileSlug: "",
        countrySlug: "spain",
        regionSlug: "valencia",
        citySlug: defaultCitySlug ?? cityOptions[0]?.slug ?? "torrevieja",
        districtSlug: "",
        geoScopeType: "city",
        addressText: "",
        latitude: undefined,
        longitude: undefined,
        googlePlaceId: "",
      });
    });
  });

  return (
    <div className="form-shell">
      <form onSubmit={onSubmit} className="grid gap-5">
        <section className="form-section-muted grid gap-3 text-sm leading-7 text-slate-600">
          <div>
            <p className="form-kicker">Подання через модерацію</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Спочатку коротко зафіксуйте суть, потім уточніть автора і локацію</h2>
          </div>
          <p>
            Публікація напряму недоступна. Кожне подання проходить перевірку змісту, категорії, географії та типу автора.
          </p>
          <p>Чим точніші місто, категорія й спосіб контакту, тим швидше матеріал перейде в чергу схвалення.</p>
        </section>

        <section className="form-section grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="form-kicker">Прогрес форми</p>
            <p className="text-xs font-medium text-slate-500">Поля з * обовʼязкові для надсилання</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={stepOneReady ? "status-pill bg-emerald-100 text-emerald-800" : "status-pill"}>1. Основа</span>
            <span className={stepTwoReady ? "status-pill bg-emerald-100 text-emerald-800" : "status-pill"}>2. Географія й автор</span>
            <span className={stepThreeReady ? "status-pill bg-emerald-100 text-emerald-800" : "status-pill"}>3. Уточнення</span>
          </div>
        </section>

        <section className="form-section grid gap-4">
          <div>
            <p className="form-kicker">Крок 1</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Основна інформація</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
            <label className="grid gap-2">
              <span className="field-label">Заголовок *</span>
              <input {...form.register("title")} className="input-shell" />
              <span className="field-help">Один чіткий рядок, щоб людина одразу зрозуміла суть.</span>
              {form.formState.errors.title ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.title.message)}</span> : null}
            </label>
            <label className="grid gap-2">
              <span className="field-label">Категорія *</span>
              <select
                className="select-shell"
                value={selectedCategory}
                {...form.register("categorySlug")}
                onChange={(event) => {
                  setSelectedCategory(event.target.value);
                  form.setValue("categorySlug", event.target.value);
                }}
              >
                {categoryOptions.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
              <span className="field-help">Категорія визначає додаткові поля й маршрут модерації.</span>
              {form.formState.errors.categorySlug ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.categorySlug.message)}</span> : null}
            </label>
          </div>

          <label className="grid gap-2">
            <span className="field-label">Короткий опис *</span>
            <textarea {...form.register("summary")} rows={3} className="textarea-shell" />
            <span className="field-help">2-3 речення: що саме пропонуєте або шукаєте.</span>
            {form.formState.errors.summary ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.summary.message)}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="field-label">Деталі *</span>
            <textarea {...form.register("body")} rows={5} className="textarea-shell" />
            <span className="field-help">Уточніть умови, часові рамки, формат контакту, важливі обмеження.</span>
            {form.formState.errors.body ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.body.message)}</span> : null}
          </label>
        </section>

        <section className="form-section grid gap-4">
          <div>
            <p className="form-kicker">Крок 2</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Географія та автор</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="field-label">Місто</span>
              <select {...form.register("citySlug")} className="select-shell">
                {cityOptions.map((city) => (
                  <option key={city.slug} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
              {form.formState.errors.citySlug ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.citySlug.message)}</span> : null}
            </label>

            <fieldset className="grid gap-2">
              <legend className="field-label">Рівень географії</legend>
              <div className="flex flex-wrap gap-2">
                {geoScopeOptions.map((option) => {
                  const checked = selectedGeoScope === option.value;

                  return (
                    <label key={option.value} className={checked ? "choice-segment-active cursor-pointer" : "choice-segment cursor-pointer"}>
                      <input type="radio" value={option.value} className="sr-only" {...form.register("geoScopeType")} />
                      {option.label}
                    </label>
                  );
                })}
              </div>
              <span className="field-help">Визначає, наскільки вузько буде показуватися запис у майбутньому.</span>
            </fieldset>
          </div>

          <fieldset className="grid gap-2">
            <legend className="field-label">Тип автора</legend>
            <div className="flex flex-wrap gap-2">
              {authorTypeOptions.map((option) => {
                const checked = selectedAuthorType === option.value;

                return (
                  <label key={option.value} className={checked ? "choice-segment-active cursor-pointer" : "choice-segment cursor-pointer"}>
                    <input type="radio" value={option.value} className="sr-only" {...form.register("authorType")} />
                    {option.label}
                  </label>
                );
              })}
            </div>
            <span className="field-help">Приватні, бізнесові та організаційні подання відображаються й перевіряються по-різному.</span>
          </fieldset>

          {selectedAuthorType === "business" || selectedAuthorType === "community_org" ? (
            <label className="grid gap-2">
              <span className="field-label">Повʼязаний бізнес-профіль</span>
              <select {...form.register("businessProfileSlug")} className="select-shell">
                <option value="">Оберіть профіль</option>
                {businessProfiles.map((profile) => (
                  <option key={profile.slug} value={profile.slug}>
                    {profile.name}
                  </option>
                ))}
              </select>
              <span className="field-help">Привʼязка до профілю підсилює довіру й прискорює перевірку модератором.</span>
            </label>
          ) : null}

          <label className="grid gap-2">
            <span className="field-label">Адреса або орієнтир</span>
            <input {...form.register("addressText")} className="input-shell" />
            <span className="field-help">Необовʼязково. Додайте, якщо місце важливе для маршруту, події чи сервісу.</span>
            {form.formState.errors.addressText ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.addressText.message)}</span> : null}
          </label>
        </section>

        {definition ? (
          <section className="form-section grid gap-4">
            <div>
              <p className="form-kicker">Крок 3</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Уточнення для категорії</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {definition.fields.map((field) => (
                <label key={field.key} className="grid gap-2">
                  <span className="field-label">{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea {...form.register(field.key as never)} rows={4} className="textarea-shell" />
                  ) : field.type === "select" ? (
                    <select {...form.register(field.key as never)} className="select-shell">
                      <option value="">Оберіть</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {schemaOptionLabels[option] ?? option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...form.register(field.key as never)}
                      type={field.key === "starts_at" || field.key === "ends_at" ? "datetime-local" : field.type === "number" ? "number" : "text"}
                      placeholder={field.placeholder}
                      className="input-shell"
                    />
                  )}
                  {field.placeholder ? <span className="field-help">{field.placeholder}</span> : null}
                  {form.formState.errors[field.key as keyof typeof form.formState.errors] ? (
                    <span className="text-xs font-medium text-rose-600">
                      {String(form.formState.errors[field.key as keyof typeof form.formState.errors]?.message)}
                    </span>
                  ) : null}
                </label>
              ))}
            </div>
          </section>
        ) : null}

        <details className="form-section-muted group">
          <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900 marker:hidden">
            Додаткові поля для карти й технічної привʼязки
          </summary>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="field-label">Google Place ID</span>
              <input {...form.register("googlePlaceId")} className="input-shell" />
            </label>
            <label className="grid gap-2">
              <span className="field-label">Широта</span>
              <input {...form.register("latitude")} type="number" step="any" className="input-shell" />
            </label>
            <label className="grid gap-2">
              <span className="field-label">Довгота</span>
              <input {...form.register("longitude")} type="number" step="any" className="input-shell" />
            </label>
          </div>
        </details>

        <section className="form-section grid gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={isPending} className="cta-primary disabled:opacity-60">
              Надіслати на модерацію
            </button>
            <p className="text-sm text-slate-500">Публікація напряму недоступна. Запис спершу потрапляє в чергу перевірки.</p>
          </div>

          {resultMessage ? (
            <div className="grid gap-3 rounded-2xl bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
              <p>
                <strong>Готово:</strong> подання створено зі статусом <span className="font-semibold">На перевірці</span>.
              </p>
              <p>Далі модератор перевірить зміст, географію, категорію та коректність типу автора.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/admin/moderation" className="cta-secondary">
                  Відкрити чергу модерації
                </Link>
                <Link href={moduleLandingHref} className="cta-secondary">
                  {moduleLandingLabel}
                </Link>
                <Link href={`/add/${moduleKey === "listings" ? "listing" : moduleKey === "services" ? "service" : "event"}`} className="cta-secondary">
                  Створити ще одну подачу
                </Link>
              </div>
            </div>
          ) : null}
        </section>
      </form>

      <aside className="grid gap-4 lg:sticky lg:top-24">
        <section className="form-section">
          <p className="form-kicker">Коротке резюме</p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">Що зараз створюється</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="eyebrow-muted">Модуль</p>
              <p className="mt-1 font-semibold text-slate-900">{moduleTitle}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="eyebrow-muted">Категорія</p>
              <p className="mt-1 font-semibold text-slate-900">{selectedCategoryLabel}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="eyebrow-muted">Місто</p>
              <p className="mt-1 font-semibold text-slate-900">{selectedCityName}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="eyebrow-muted">Автор</p>
              <p className="mt-1 font-semibold text-slate-900">{authorTypeOptions.find((item) => item.value === selectedAuthorType)?.label ?? "Приватна особа"}</p>
            </div>
          </div>
        </section>

        <section className="form-section-muted grid gap-3 text-sm leading-6 text-slate-600">
          <p className="font-semibold text-slate-900">Що перевіряє модерація</p>
          <ul className="grid gap-2">
            <li>Точність категорії й зрозумілий заголовок.</li>
            <li>Коректність міста, адреси та географічного масштабу.</li>
            <li>Відповідність типу автора: приватно, бізнес чи організація.</li>
            <li>Наявність корисної інформації для читача без спаму й дублювань.</li>
          </ul>
        </section>
      </aside>
    </div>
  );
}
