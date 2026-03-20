"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitModeratedContent } from "@/server/actions/submissions";
import { buildSubmissionSchema, getCategorySchemaDefinition } from "@/schemas/category-schemas";
import type { City } from "@/data/cities";
import type { CategoryDefinition } from "@/types/domain";
import type { GenericSubmissionInput } from "@/schemas/category-schemas";

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

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const response = await submitModeratedContent(moduleKey, schemaKey, {
        ...values,
        categorySlug: selectedCategory,
      } as GenericSubmissionInput);
      setResultMessage(`Submission created: ${response.status}`);
    });
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-soft lg:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Заголовок</span>
          <input {...form.register("title")} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
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
                {category.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Короткий опис</span>
        <textarea {...form.register("summary")} rows={3} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Деталі</span>
        <textarea {...form.register("body")} rows={5} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm" />
      </label>

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
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Тип автора</span>
          <select {...form.register("authorType")} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm">
            <option value="private_person">Приватна особа</option>
            <option value="business">Бізнес</option>
            <option value="community_org">Організація</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Адреса</span>
          <input {...form.register("addressText")} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm" />
        </label>
      </div>

      {definition ? (
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
            </label>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={isPending} className="cta-primary disabled:opacity-60">
          Надіслати на модерацію
        </button>
        <p className="text-sm text-slate-500">Публікація напряму недоступна. Усі public submissions проходять moderation queue.</p>
      </div>

      {resultMessage ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{resultMessage}</p> : null}
    </form>
  );
}
