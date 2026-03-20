import { describe, expect, it } from "vitest";
import { canTransitionModerationStatus } from "@/server/moderation";

describe("moderation flow", () => {
  it("allows valid review transitions", () => {
    expect(canTransitionModerationStatus("pending_review", "approved")).toBe(true);
    expect(canTransitionModerationStatus("pending_review", "changes_requested")).toBe(true);
  });

  it("blocks invalid direct transitions", () => {
    expect(canTransitionModerationStatus("draft", "published")).toBe(false);
    expect(canTransitionModerationStatus("published", "approved")).toBe(false);
  });
});
