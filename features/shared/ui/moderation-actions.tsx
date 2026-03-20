"use client";

import { useTransition } from "react";
import { transitionModerationStatus } from "@/server/actions/moderation";

type ModerationActionsProps = {
  entityTable: string;
  entityId: string;
};

export function ModerationActions({ entityTable, entityId }: ModerationActionsProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {[
        { label: "Request changes", nextStatus: "changes_requested" },
        { label: "Approve", nextStatus: "approved" },
        { label: "Reject", nextStatus: "rejected" },
      ].map((action) => (
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
                nextStatus: action.nextStatus as "changes_requested" | "approved" | "rejected",
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
