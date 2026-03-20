import type { AuthorType } from "@/types/domain";

const labels: Record<AuthorType, string> = {
  private_person: "Приватне оголошення",
  business: "Бізнес",
  community_org: "Організація",
  editorial: "Редакція",
  official: "Офіційно",
};

type AuthorBadgeProps = {
  authorType: AuthorType;
  verified?: boolean;
};

export function AuthorBadge({ authorType, verified }: AuthorBadgeProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">{labels[authorType]}</span>
      {verified ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Перевірено</span> : null}
    </div>
  );
}
