export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-white/70 bg-[rgba(255,250,244,0.85)]">
      <div className="shell-container grid gap-5 py-8 text-sm text-slate-600 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-2">
          <p className="eyebrow">uahub.world</p>
          <p>Платформа для повсякденних задач української спільноти: житло, оголошення, послуги, події, гіди, ресурси та приватні знайомства.</p>
        </div>
        <div className="space-y-2">
          <p>Geo-first структура залишається масштабованою на нові міста, регіони та країни.</p>
          <p>UI українською, моделі й дані англійською, контент може бути мультимовним.</p>
        </div>
      </div>
    </footer>
  );
}
