import type { PropsWithChildren } from "react";
import type { City } from "@/data/cities";
import { CitySidebar } from "./city-sidebar";
import { MobileCityNav } from "./mobile-city-nav";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type SiteFrameProps = PropsWithChildren<{
  city?: City;
  currentSection?: string;
}>;

export function SiteFrame({ children, city, currentSection = "overview" }: SiteFrameProps) {
  return (
    <div className="min-h-screen bg-site-bg text-slate-900">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
        {city ? <MobileCityNav city={city} currentSection={currentSection} /> : null}

        {city ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <CitySidebar city={city} currentSection={currentSection} />
            <main>{children}</main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
