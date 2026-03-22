"use server";

import { getContentRepository } from "@/server/content";
import { assertAdminAccess } from "@/server/auth/admin-access";
import { canTransitionModerationStatus } from "@/server/moderation";
import type { ModerationTransitionInput } from "@/server/repositories/content-repository";

export async function transitionModerationStatus(input: ModerationTransitionInput) {
  await assertAdminAccess();

  const repository = getContentRepository();
  const currentStatus = await repository.getModerationStatus(input.entityTable, input.entityId);

  if (!currentStatus) {
    throw new Error("Moderation target was not found.");
  }

  if (!canTransitionModerationStatus(currentStatus, input.nextStatus)) {
    throw new Error("Invalid moderation transition.");
  }

  return repository.transitionModeration(input);
}
