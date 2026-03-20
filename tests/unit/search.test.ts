import { describe, expect, it } from "vitest";
import { MockContentRepository } from "@/server/repositories/mock-content-repository";

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
});
