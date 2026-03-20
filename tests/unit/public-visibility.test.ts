import { describe, expect, it } from "vitest";
import { MockContentRepository } from "@/server/repositories/mock-content-repository";

describe("public visibility", () => {
  it("returns only published public listings", async () => {
    const repository = new MockContentRepository();
    const items = await repository.listListings();

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => item.status === "published" && item.visibility === "public")).toBe(true);
  });
});
