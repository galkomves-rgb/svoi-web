import { describe, expect, it } from "vitest";
import { canTransitionModerationStatus } from "@/server/moderation";
import { MockContentRepository } from "@/server/repositories/mock-content-repository";

describe("moderation flow", () => {
  it("allows valid review transitions", () => {
    expect(canTransitionModerationStatus("pending_review", "approved")).toBe(true);
    expect(canTransitionModerationStatus("pending_review", "changes_requested")).toBe(true);
  });

  it("blocks invalid direct transitions", () => {
    expect(canTransitionModerationStatus("draft", "published")).toBe(false);
    expect(canTransitionModerationStatus("published", "approved")).toBe(false);
  });

  it("reads real moderation status from repository targets", async () => {
    const repository = new MockContentRepository();

    await expect(repository.getModerationStatus("submissions", "submission-listing-1")).resolves.toBe("pending_review");
    await expect(repository.getModerationStatus("listings", "listing-alicante-barista")).resolves.toBe("published");
    await expect(repository.getModerationStatus("unknown_table", "missing")).resolves.toBeNull();
  });
});
