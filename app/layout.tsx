import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "uahub.world",
    template: "%s | uahub.world",
  },
  description: "Українська міська платформа для житла, роботи, сервісів, подій, гідів і community discovery в Іспанії.",
  applicationName: "uahub.world",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "uahub.world",
    description: "Українська міська платформа для житла, роботи, сервісів, подій, гідів і community discovery в Іспанії.",
    url: siteUrl,
    siteName: "uahub.world",
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "uahub.world",
    description: "Українська міська платформа для житла, роботи, сервісів, подій, гідів і community discovery в Іспанії.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
