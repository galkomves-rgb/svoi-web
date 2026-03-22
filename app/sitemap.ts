import type { MetadataRoute } from "next";
import { businessProfiles } from "@/data/business-profiles";
import { events } from "@/data/events";
import { guides } from "@/data/guides";
import { listings } from "@/data/listings";
import { realEstateRecords } from "@/data/real-estate";
import { resources } from "@/data/resources";
import { services } from "@/data/services";
import { citySections } from "@/lib/site";
import { siteUrl } from "@/lib/seo";
import { cities } from "@/data/cities";

const publicEntity = <T extends { status: string; visibility: string }>(item: T) => item.status === "published" && item.visibility === "public";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/start`, lastModified: new Date() },
    { url: `${siteUrl}/search`, lastModified: new Date() },
  ];

  const cityRoutes: MetadataRoute.Sitemap = cities.flatMap((city) => [
    { url: `${siteUrl}/${city.slug}`, lastModified: new Date() },
    ...citySections
      .filter((section) => section.href)
      .map((section) => ({ url: `${siteUrl}/${city.slug}${section.href}`, lastModified: new Date() })),
  ]);

  const listingRoutes = listings.filter(publicEntity).map((item) => ({
    url: `${siteUrl}/${item.citySlug}/listings/${item.slug}`,
    lastModified: item.updatedAt ?? item.publishedAt ?? item.createdAt,
  }));

  const realEstateRoutes = realEstateRecords.filter(publicEntity).map((item) => ({
    url: `${siteUrl}/${item.citySlug}/real-estate/${item.slug}`,
    lastModified: item.updatedAt ?? item.publishedAt ?? item.createdAt,
  }));

  const serviceRoutes = services.filter(publicEntity).map((item) => ({
    url: `${siteUrl}/${item.citySlug}/services/${item.slug}`,
    lastModified: item.updatedAt ?? item.publishedAt ?? item.createdAt,
  }));

  const eventRoutes = events.filter(publicEntity).map((item) => ({
    url: `${siteUrl}/${item.citySlug}/events/${item.slug}`,
    lastModified: item.updatedAt ?? item.publishedAt ?? item.createdAt,
  }));

  const guideRoutes = guides.filter(publicEntity).map((item) => ({
    url: `${siteUrl}/${item.citySlug}/guide/${item.slug}`,
    lastModified: item.updatedAt ?? item.publishedAt ?? item.createdAt,
  }));

  const resourceRoutes = resources.filter(publicEntity).map((item) => ({
    url: `${siteUrl}/${item.citySlug}/resources/${item.slug}`,
    lastModified: item.updatedAt ?? item.publishedAt ?? item.createdAt,
  }));

  const businessRoutes = businessProfiles.filter(publicEntity).map((item) => ({
    url: `${siteUrl}/business/${item.slug}`,
    lastModified: item.updatedAt ?? item.createdAt,
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...listingRoutes,
    ...realEstateRoutes,
    ...serviceRoutes,
    ...eventRoutes,
    ...guideRoutes,
    ...resourceRoutes,
    ...businessRoutes,
  ];
}