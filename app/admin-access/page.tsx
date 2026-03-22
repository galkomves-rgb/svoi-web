import Link from "next/link";
import { Card } from "@/components/ui/card";
import { SiteFrame } from "@/components/layout/site-frame";
import { getAdminAccessToken, isAdminGuardBypassed } from "@/lib/admin-access";
import { unlockAdminAccess } from "./actions";

type AdminAccessPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export default async function AdminAccessPage({ searchParams }: AdminAccessPageProps) {
  const params = await searchParams;
  const nextPath = params.next && params.next.startsWith("/") ? params.next : "/admin";
  const hasError = params.error === "1";
  const requiresToken = !isAdminGuardBypassed() && Boolean(getAdminAccessToken());

  return (
    <SiteFrame>
      <div className="mx-auto max-w-2xl section-stack">
        <section className="surface-feature p-6 lg:p-8">
          <p className="eyebrow">Admin access</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 lg:text-[2.25rem]">Доступ до адмін-панелі</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Адмінський контур захищений окремим ключем доступу. Це тимчасовий guard до інтеграції повноцінної авторизації з ролями.
          </p>
        </section>

        <Card as="section" className="space-y-4 rounded-3xl">
          {requiresToken ? (
            <form action={unlockAdminAccess} className="grid gap-4">
              <input type="hidden" name="next" value={nextPath} />
              <label className="grid gap-2">
                <span className="field-label">Ключ доступу</span>
                <input type="password" name="token" className="input-shell" autoComplete="current-password" />
              </label>
              {hasError ? <p className="text-sm font-medium text-rose-600">Невірний ключ доступу. Спробуйте ще раз.</p> : null}
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="cta-primary">
                  Увійти в адмін-панель
                </button>
                <Link href="/" className="cta-secondary">
                  Повернутися на сайт
                </Link>
              </div>
            </form>
          ) : (
            <div className="grid gap-3 text-sm leading-7 text-slate-600">
              <p>Для production-середовища задайте змінну `ADMIN_ACCESS_TOKEN`, щоб увімкнути захист адмін-панелі.</p>
              <div className="flex flex-wrap gap-3">
                <Link href={nextPath} className="cta-primary">
                  Продовжити локально
                </Link>
                <Link href="/" className="cta-secondary">
                  На головну
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </SiteFrame>
  );
}
