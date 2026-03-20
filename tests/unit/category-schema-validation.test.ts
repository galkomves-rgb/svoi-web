import { describe, expect, it } from "vitest";
import { buildSubmissionSchema } from "@/schemas/category-schemas";

describe("category schema validation", () => {
  it("validates listing job schema", () => {
    const schema = buildSubmissionSchema("listing-job");
    const result = schema.safeParse({
      title: "Потрібен бариста у центрі",
      summary: "Робота на вечірні зміни",
      body: "Деталі вакансії",
      categorySlug: "hiring",
      authorType: "business",
      countrySlug: "spain",
      regionSlug: "valencia",
      citySlug: "alicante",
      geoScopeType: "city",
      salary_range: "8-10 €/год",
      employment_type: "part-time",
    });

    expect(result.success).toBe(true);
  });
});
