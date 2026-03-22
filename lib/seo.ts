import type { Metadata } from "next";

export const siteUrl = "https://uahub.world";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "uahub.world",
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}