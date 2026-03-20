"use server";

import { getContentRepository } from "@/server/content";
import { canTransitionModerationStatus } from "@/server/moderation";
import type { ModerationTransitionInput } from "@/server/repositories/content-repository";

export async function transitionModerationStatus(input: ModerationTransitionInput) {
  const currentStatus = "pending_review" as const;

  if (!canTransitionModerationStatus(currentStatus, input.nextStatus as never)) {
    throw new Error("Invalid moderation transition.");
  }

  return getContentRepository().transitionModeration(input);
}
