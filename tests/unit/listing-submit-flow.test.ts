import { describe, expect, it } from "vitest";
import { MockContentRepository } from "@/server/repositories/mock-content-repository";

describe("listing submit flow", () => {
  it("creates pending review submission instead of published content", async () => {
    const repository = new MockContentRepository();
    const created = await repository.createSubmission({
      module: "listings",
      categorySlug: "rent-offer",
      title: "Оренда кімнати на 2 тижні",
      summary: "Базовий test submission",
      body: "Текст для модерації",
      authorType: "private_person",
      businessProfileSlug: null,
      geoScopeType: "city",
      countrySlug: "spain",
      regionSlug: "valencia",
      citySlug: "torrevieja",
      districtSlug: "centro",
      payload: { rooms: 1 },
    });

    expect(created.status).toBe("pending_review");
  });
});
