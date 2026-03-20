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
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
      <div className="grid gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
        <p>
          <strong className="text-slate-900">Як це працює:</strong> ви заповнюєте форму, матеріал потрапляє у чергу модерації, а публікація відбувається лише після перевірки.
        </p>
        <p>
          <strong className="text-slate-900">Порада:</strong> чим точніші місто, категорія та контактні дані, тим швидше модератор зможе схвалити submission.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Основна інформація</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Що ви хочете додати</h2>
        </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Заголовок</span>
          <input {...form.register("title")} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
          {form.formState.errors.title ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.title.message)}</span> : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Категорія</span>
          <select
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm"
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
          {form.formState.errors.categorySlug ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.categorySlug.message)}</span> : null}
        </label>
      </div>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Короткий опис</span>
        <textarea {...form.register("summary")} rows={3} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
        {form.formState.errors.summary ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.summary.message)}</span> : null}
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Деталі</span>
        <textarea {...form.register("body")} rows={5} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
        {form.formState.errors.body ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.body.message)}</span> : null}
      </label>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Географія та автор</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Де це актуально і хто подає</h2>
        </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Місто</span>
          <select {...form.register("citySlug")} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
            {cityOptions.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name}
              </option>
            ))}
          </select>
          {form.formState.errors.citySlug ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.citySlug.message)}</span> : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Тип автора</span>
          <select {...form.register("authorType")} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
            <option value="private_person">Приватна особа</option>
            <option value="business">Бізнес</option>
            <option value="community_org">Організація</option>
          </select>
          <span className="text-xs text-slate-500">Приватні та бізнес-подачі надалі відображаються по-різному в UI та модерації.</span>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Адреса</span>
          <input {...form.register("addressText")} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
          {form.formState.errors.addressText ? <span className="text-xs font-medium text-rose-600">{String(form.formState.errors.addressText.message)}</span> : null}
        </label>
      </div>
      </div>

      {selectedAuthorType === "business" || selectedAuthorType === "community_org" ? (
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Повʼязаний бізнес-профіль</span>
          <select {...form.register("businessProfileSlug")} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
            <option value="">Оберіть профіль</option>
            {businessProfiles.map((profile) => (
              <option key={profile.slug} value={profile.slug}>
                {profile.name}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-500">Для бізнесу та організацій краще привʼязувати submission до профілю, щоб модерація бачила контекст і довіру.</span>
        </label>
      ) : null}

      {definition ? (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-900">Поля категорії</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Що ще потрібно уточнити</h2>
          </div>
        <div className="grid gap-4 md:grid-cols-2">
          {definition.fields.map((field) => (
            <label key={field.key} className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea {...form.register(field.key as never)} rows={4} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
              ) : field.type === "select" ? (
                <select {...form.register(field.key as never)} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
                  <option value="">Оберіть</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...form.register(field.key as never)}
                  type={field.type === "number" ? "number" : "text"}
                  placeholder={field.placeholder}
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm"
                />
              )}
              {form.formState.errors[field.key as keyof typeof form.formState.errors] ? (
                <span className="text-xs font-medium text-rose-600">
                  {String(form.formState.errors[field.key as keyof typeof form.formState.errors]?.message)}
                </span>
              ) : null}
            </label>
          ))}
        </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={isPending} className="cta-primary disabled:opacity-60">
          Надіслати на модерацію
        </button>
        <p className="text-sm text-slate-500">Пряма публікація недоступна. Усі публічні подачі проходять чергу модерації.</p>
      </div>

      {resultMessage ? (
        <div className="grid gap-3 rounded-2xl bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
          <p>
            <strong>Готово:</strong> submission створено зі статусом <span className="font-semibold">На перевірці</span>.
          </p>
          <p>Наступний крок: модератор перевірить зміст, географію, категорію та коректність автора.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/moderation" className="cta-secondary">
              Відкрити чергу модерації
            </Link>
            <Link href={`/add/${moduleKey === "listings" ? "listing" : moduleKey === "services" ? "service" : "event"}`} className="cta-secondary">
              Створити ще одну подачу
            </Link>
          </div>
        </div>
      ) : null}
    </form>
  );
}
