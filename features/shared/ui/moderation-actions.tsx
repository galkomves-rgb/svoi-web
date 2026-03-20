"use client";

import { useTransition } from "react";
import { transitionModerationStatus } from "@/server/actions/moderation";

type ModerationActionsProps = {
  entityTable: string;
  entityId: string;
  currentStatus?: "draft" | "pending_review" | "changes_requested" | "approved" | "published" | "rejected" | "archived" | "expired";
};

const statusActions = {
  pending_review: [
    { label: "Попросити зміни", nextStatus: "changes_requested" },
    { label: "Схвалити", nextStatus: "approved" },
    { label: "Відхилити", nextStatus: "rejected" },
  ],
  changes_requested: [
    { label: "Повернути на перевірку", nextStatus: "pending_review" },
    { label: "Архівувати", nextStatus: "archived" },
  ],
  approved: [
    { label: "Опублікувати", nextStatus: "published" },
    { label: "Архівувати", nextStatus: "archived" },
  ],
  rejected: [{ label: "Архівувати", nextStatus: "archived" }],
  draft: [{ label: "Відправити на перевірку", nextStatus: "pending_review" }],
  published: [{ label: "Архівувати", nextStatus: "archived" }],
  archived: [],
  expired: [{ label: "Архівувати", nextStatus: "archived" }],
} as const satisfies Record<
  "draft" | "pending_review" | "changes_requested" | "approved" | "published" | "rejected" | "archived" | "expired",
  ReadonlyArray<{
    label: string;
    nextStatus: "draft" | "pending_review" | "changes_requested" | "approved" | "published" | "rejected" | "archived" | "expired";
  }>
>;

export function ModerationActions({ entityTable, entityId, currentStatus = "pending_review" }: ModerationActionsProps) {
  const [isPending, startTransition] = useTransition();
  const actions = statusActions[currentStatus] ?? [];

  if (!actions.length) {
    return <p className="text-sm text-slate-500">Для цього статусу доступних дій немає.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <button
          key={action.nextStatus}
          type="button"
          disabled={isPending}
          className="cta-secondary disabled:opacity-60"
          onClick={() =>
            startTransition(async () => {
              await transitionModerationStatus({
                entityTable,
                entityId,
                nextStatus: action.nextStatus,
              });
            })
          }
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
