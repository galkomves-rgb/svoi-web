import { notFound } from "next/navigation";
import { cities, type City, type CitySlug } from "@/data/cities";
import { events } from "@/data/events";
import { guides } from "@/data/guides";
import { listings, type Listing } from "@/data/listings";
import { services } from "@/data/services";

export const citySections = [
  { key: "overview", label: "Огляд", href: "" },
  { key: "listings", label: "Оголошення", href: "/listings" },
  { key: "events", label: "Події", href: "/events" },
  { key: "services", label: "Послуги", href: "/services" },
  { key: "guide", label: "Гід", href: "/guide" },
] as const;

export const listingCategoryGroups = {
  Усі: [],
  Житло: ["rent-offer", "rent-request", "sale-offer", "roommate-search"],
  Робота: ["hiring", "looking-for-work"],
  Послуги: ["need-help", "can-help", "local-request", "looking-for-contacts", "sell", "buy", "exchange"],
} as const;

export const listingCategories = Object.keys(listingCategoryGroups) as Array<keyof typeof listingCategoryGroups>;

export function getListingCategoryLabel(categorySlug: Listing["categorySlug"]) {
  if (listingCategoryGroups.Житло.includes(categorySlug as never)) return "Житло";
  if (listingCategoryGroups.Робота.includes(categorySlug as never)) return "Робота";
  return "Послуги";
}

export const getCities = () => cities;

export const getCity = (slug: string): City | undefined => cities.find((city) => city.slug === slug);

export const getCityOrThrow = (slug: string): City => {
  const city = getCity(slug);

  if (!city) {
    notFound();
  }

  return city;
};

export const getCityListings = (slug: CitySlug, limit?: number) => {
  const items = listings.filter((item) => item.citySlug === slug && item.status === "published" && item.visibility === "public");
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const filterCityListings = (
  slug: CitySlug,
  options?: {
    category?: string;
    query?: string;
  },
) => {
  const category = options?.category?.trim() as keyof typeof listingCategoryGroups | undefined;
  const query = options?.query?.trim().toLowerCase();
  const allowedCategorySlugs = (category && category !== "Усі" ? [...listingCategoryGroups[category]] : []) as string[];

  return getCityListings(slug).filter((item) => {
    const matchesCategory = !category || category === "Усі" ? true : allowedCategorySlugs.includes(item.categorySlug);
    const haystack = `${item.title} ${item.summary} ${item.body ?? ""} ${item.districtSlug ?? ""} ${item.tags.join(" ")}`.toLowerCase();
    const matchesQuery = !query ? true : haystack.includes(query);

    return matchesCategory && matchesQuery;
  });
};

export const getListingOrThrow = (citySlug: CitySlug, slug: string): Listing => {
  const listing = listings.find((item) => item.citySlug === citySlug && item.slug === slug);

  if (!listing) {
    notFound();
  }

  return listing;
};

export const getListingParams = () =>
  listings.map((listing) => ({
    city: listing.citySlug,
    slug: listing.slug,
  }));

export const getCityEvents = (slug: CitySlug, limit?: number) => {
  const items = events.filter((item) => item.citySlug === slug && item.status === "published" && item.visibility === "public");
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const getEventOrThrow = (citySlug: CitySlug, slug: string) => {
  const event = events.find((item) => item.citySlug === citySlug && item.slug === slug);
  if (!event) notFound();
  return event;
};

export const getEventParams = () => events.map((event) => ({ city: event.citySlug, slug: event.slug }));

export const getCityServices = (slug: CitySlug, limit?: number) => {
  const items = services.filter((item) => item.citySlug === slug && item.status === "published" && item.visibility === "public");
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const getServiceOrThrow = (citySlug: CitySlug, slug: string) => {
  const service = services.find((item) => item.citySlug === citySlug && item.slug === slug);
  if (!service) notFound();
  return service;
};

export const getServiceParams = () => services.map((service) => ({ city: service.citySlug, slug: service.slug }));

export const getCityGuides = (slug: CitySlug, limit?: number) => {
  const items = guides.filter((item) => item.citySlug === slug && item.status === "published" && item.visibility === "public");
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const getGuideOrThrow = (citySlug: CitySlug, slug: string) => {
  const guide = guides.find((item) => item.citySlug === citySlug && item.slug === slug);
  if (!guide) notFound();
  return guide;
};

export const getGuideParams = () => guides.map((guide) => ({ city: guide.citySlug, slug: guide.slug }));

export const getCityParams = () => cities.map((city) => ({ city: city.slug }));
