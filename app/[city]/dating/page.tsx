import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteFrame } from "@/components/layout/site-frame";
import { DatingProfileCard } from "@/features/dating/dating-profile-card";
import { datingIntentLabels, filterCityDatingProfiles, getCityOrThrow, getCityParams } from "@/lib/site";

export function generateStaticParams() {
  return getCityParams();
}

type DatingPageProps = {
  params: Promise<{ city: string }>;
  searchParams: Promise<{
    intent?: string;
    verified?: string;
  }>;
};

export default async function DatingPage({ params, searchParams }: DatingPageProps) {
  const { city: citySlug } = await params;
  const filters = await searchParams;
  const city = getCityOrThrow(citySlug);
  const selectedIntent = filters.intent && filters.intent in datingIntentLabels ? filters.intent : "all";
  const verifiedOnly = filters.verified === "1";
  const profiles = filterCityDatingProfiles(city.slug, {
    intent: selectedIntent,
    verifiedOnly,
  });

  const makeHref = (next: { intent?: string; verified?: boolean }) => {
    const params = new URLSearchParams();
    const intent = next.intent ?? selectedIntent;
    const verified = typeof next.verified === "boolean" ? next.verified : verifiedOnly;

    if (intent !== "all") params.set("intent", intent);
    if (verified) params.set("verified", "1");

    const query = params.toString();
    return query ? `/${city.slug}/dating?${query}` : `/${city.slug}/dating`;
  };

  return (
    <SiteFrame city={city} currentSection="dating">
      <div className="space-y-6">
        <section className="surface-section p-6 lg:p-8">
          <SectionHeading
            title="Знайомства"
            subtitle={`Приватний city-first модуль для ${city.name}: друзі, нетворк і відносини без публічного swipe UX.`}
          />
          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              {Object.entries(datingIntentLabels).map(([value, label]) => (
                <a
                  key={value}
                  href={makeHref({ intent: value })}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selectedIntent === value ? "border-blue-900 bg-blue-900 text-white" : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {label}
                </a>
              ))}
              <a
                href={makeHref({ verified: !verifiedOnly })}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  verifiedOnly ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                Лише перевірені
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-600">
              Профілів: <span className="font-semibold text-slate-900">{profiles.length}</span>
            </p>
            {profiles.length ? (
              <div className="grid gap-4">
                {profiles.map((profile) => (
                  <DatingProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <Card as="section" className="space-y-3 rounded-3xl bg-slate-50">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Поки профілів не знайдено</h2>
                <p className="text-sm leading-7 text-slate-600">Спробуйте інший тип знайомств або вимкніть фільтр перевірених.</p>
                <a href={`/${city.slug}/dating`} className="cta-secondary">
                  Очистити фільтри
                </a>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card as="aside" className="space-y-4 rounded-3xl bg-slate-50">
              <p className="eyebrow">Як це працює</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="text-slate-900">Фото не відкрите одразу:</strong> приватність і безпечний перший контакт важливіші за swipe.
                </p>
                <p>
                  <strong className="text-slate-900">Запит на знайомство:</strong> спочатку намір, потім схвалення, і лише тоді більше деталей.
                </p>
                <p>
                  <strong className="text-slate-900">Чат:</strong> наступний етап, але не частина цього foundation MVP.
                </p>
              </div>
            </Card>

            <Card as="aside" className="space-y-4 rounded-3xl">
              <p className="eyebrow">Наступний розвиток</p>
              <div className="grid gap-3 text-sm leading-7 text-slate-600">
                <p>Далі тут мають з’явитися onboarding intents, верифікація, safe chat permissions і контрольоване відкриття фото.</p>
                <p>Поточний крок навмисно вузький: показати privacy-first модель без перевантаження логікою.</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
