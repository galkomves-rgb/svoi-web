import type { ContentStatus } from "@/types/domain";

const transitions: Record<ContentStatus, ContentStatus[]> = {
  draft: ["pending_review", "archived"],
  pending_review: ["changes_requested", "approved", "rejected"],
  changes_requested: ["pending_review", "archived"],
  approved: ["published", "archived"],
  published: ["archived", "expired"],
  rejected: ["archived"],
  archived: [],
  expired: ["archived"],
};

export function canTransitionModerationStatus(from: ContentStatus, to: ContentStatus) {
  return transitions[from].includes(to);
}
