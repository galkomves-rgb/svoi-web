"use server";

import { getContentRepository } from "@/server/content";
import { buildSubmissionSchema } from "@/schemas/category-schemas";
import type { GenericSubmissionInput } from "@/schemas/category-schemas";

export async function submitModeratedContent(moduleKey: "listings" | "services" | "events", schemaKey: string, input: GenericSubmissionInput) {
  const validated = buildSubmissionSchema(schemaKey).parse(input) as GenericSubmissionInput;
  const repository = getContentRepository();

  return repository.createSubmission({
    module: moduleKey,
    categorySlug: String(validated.categorySlug),
    title: String(validated.title),
    summary: String(validated.summary),
    body: typeof validated.body === "string" ? validated.body : "",
    authorType: validated.authorType as never,
    businessProfileSlug: typeof validated.businessProfileSlug === "string" ? validated.businessProfileSlug : null,
    geoScopeType: validated.geoScopeType as never,
    countrySlug: String(validated.countrySlug),
    regionSlug: String(validated.regionSlug),
    citySlug: String(validated.citySlug),
    districtSlug: typeof validated.districtSlug === "string" ? validated.districtSlug : null,
    payload: validated,
  });
}
