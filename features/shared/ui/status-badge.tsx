import type { ContentStatus, Visibility } from "@/types/domain";

type StatusBadgeProps = {
  status?: ContentStatus;
  visibility?: Visibility;
  featured?: boolean;
};

const statusStyles: Record<ContentStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  pending_review: "bg-amber-100 text-amber-800",
  changes_requested: "bg-orange-100 text-orange-800",
  approved: "bg-blue-100 text-blue-800",
  published: "bg-emerald-100 text-emerald-800",
  rejected: "bg-rose-100 text-rose-800",
  archived: "bg-slate-200 text-slate-700",
  expired: "bg-zinc-200 text-zinc-700",
};

const visibilityLabel: Record<Visibility, string> = {
  public: "Публічно",
  unlisted: "Unlisted",
  private: "Приватно",
  hidden_by_moderation: "Приховано",
};

export function StatusBadge({ status, visibility, featured }: StatusBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {status ? <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>{status}</span> : null}
      {visibility ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{visibilityLabel[visibility]}</span> : null}
      {featured ? <span className="rounded-full bg-blue-900 px-3 py-1 text-xs font-semibold text-white">Featured</span> : null}
    </div>
  );
}
