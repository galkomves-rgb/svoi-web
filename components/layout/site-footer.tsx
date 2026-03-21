import { ui } from "@/lib/i18n/ui";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-white/70 bg-[rgba(255,250,244,0.85)]">
      <div className="shell-container grid gap-5 py-8 text-sm text-slate-600 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-2">
          <p className="eyebrow">{ui.footer.brand}</p>
          <p>{ui.footer.mission}</p>
        </div>
        <div className="space-y-2">
          <p>{ui.footer.geoScale}</p>
          <p>{ui.footer.languageRule}</p>
        </div>
      </div>
    </footer>
  );
}
