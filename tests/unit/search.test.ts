import { describe, expect, it } from "vitest";
import { MockContentRepository } from "@/server/repositories/mock-content-repository";
import { getSearchResultHref } from "@/lib/site";

describe("search", () => {
  it("finds records by title and city filters", async () => {
    const repository = new MockContentRepository();
    const results = await repository.search({
      query: "NIE",
      citySlug: "alicante",
    });

    expect(results.some((item) => item.title.includes("NIE"))).toBe(true);
    expect(results.every((item) => item.citySlug === "alicante")).toBe(true);
  });

  it("builds detail hrefs by module", () => {
    expect(
      getSearchResultHref({
        module: "guides",
        citySlug: "alicante",
        entitySlug: "yak-zapysatys-do-likarya",
      }),
    ).toBe("/alicante/guide/yak-zapysatys-do-likarya");

    expect(
      getSearchResultHref({
        module: "services",
        citySlug: "torrevieja",
        entitySlug: "costa-move-transfer",
      }),
    ).toBe("/torrevieja/services/costa-move-transfer");

    expect(
      getSearchResultHref({
        module: "real-estate",
        citySlug: "alicante",
        entitySlug: "prodazh-apartment-ensanche-alicante",
      }),
    ).toBe("/alicante/real-estate/prodazh-apartment-ensanche-alicante");
  });
});
