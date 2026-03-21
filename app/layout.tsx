import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "uahub.world — платформа для українців в Іспанії",
    template: "%s | uahub.world",
  },
  description:
    "Житло, робота, послуги, події та стартова навігація для українців у Costa Blanca. Торревʼєха, Аліканте та інші міста.",
  metadataBase: new URL("https://uahub.world"),
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "uahub.world",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
