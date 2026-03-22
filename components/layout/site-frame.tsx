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
      <div className="shell-container py-6 lg:py-8">
        {city ? <MobileCityNav city={city} currentSection={currentSection} /> : null}

        {city ? (
          <div className="mt-5 grid gap-5 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">
            <CitySidebar city={city} currentSection={currentSection} />
            <main id="main-content">{children}</main>
          </div>
        ) : (
          <main id="main-content">{children}</main>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
