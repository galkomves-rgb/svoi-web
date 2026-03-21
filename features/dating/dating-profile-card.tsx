import type { DatingProfile } from "@/data/dating";
import { Card } from "@/components/ui/card";

const intentLabels: Record<DatingProfile["intent"], string> = {
  friends: "Друзі",
  networking: "Нетворк",
  relationships: "Відносини",
};

const photoStateLabels: Record<DatingProfile["photoState"], string> = {
  blurred: "Фото приховане до взаємного інтересу",
  locked: "Фото відкривається після схвалення",
  approved: "Фото вже відкрите",
};

const requestStateLabels: Record<DatingProfile["requestState"], string> = {
  available: "Запросити знайомство",
  pending: "Запит надіслано",
  accepted: "Контакт схвалено",
};

export function DatingProfileCard({ profile }: { profile: DatingProfile }) {
  const photoClass =
    profile.photoState === "approved"
      ? "bg-gradient-to-br from-blue-200 via-blue-100 to-amber-100"
      : profile.photoState === "blurred"
        ? "bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 blur-[1px]"
        : "bg-slate-200";

  return (
    <Card as="article" className="space-y-4 rounded-3xl transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl text-sm font-semibold text-slate-700 ${photoClass}`}>
          {profile.photoState === "approved" ? "Фото" : "Приховано"}
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="eyebrow">{intentLabels[profile.intent]}</p>
            <span className="text-sm font-medium text-slate-500">
              {profile.name}, {profile.age}
            </span>
          </div>
          <p className="text-sm leading-7 text-slate-600">{profile.summary}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {profile.interests.map((interest) => (
          <span key={interest} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {interest}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{photoStateLabels[profile.photoState]}</span>
        {profile.verified ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Перевірено</span> : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={profile.requestState !== "available"}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
            profile.requestState === "available"
              ? "bg-blue-900 text-white hover:-translate-y-0.5"
              : profile.requestState === "pending"
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {requestStateLabels[profile.requestState]}
        </button>
        <span className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
          {profile.requestState === "accepted" ? "Чат відкриється після входу" : "Профіль приватний до схвалення"}
        </span>
      </div>
    </Card>
  );
}
