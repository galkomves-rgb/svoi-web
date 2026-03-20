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

export const getCities = () => cities;

export const getCity = (slug: string): City | undefined =>
  cities.find((city) => city.slug === slug);

export const getCityOrThrow = (slug: string): City => {
  const city = getCity(slug);

  if (!city) {
    notFound();
  }

  return city;
};

export const getCityListings = (slug: CitySlug, limit?: number) => {
  const items = listings.filter((item) => item.city === slug);
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const listingCategories = ["Усі", "Житло", "Робота", "Послуги"] as const;

export const filterCityListings = (
  slug: CitySlug,
  options?: {
    category?: string;
    query?: string;
  },
) => {
  const category = options?.category?.trim();
  const query = options?.query?.trim().toLowerCase();

  return getCityListings(slug).filter((item) => {
    const matchesCategory = !category || category === "Усі" ? true : item.category === category;
    const haystack = `${item.title} ${item.description} ${item.details} ${item.district} ${item.tags.join(" ")}`.toLowerCase();
    const matchesQuery = !query ? true : haystack.includes(query);

    return matchesCategory && matchesQuery;
  });
};

export const getListingOrThrow = (citySlug: CitySlug, listingId: string): Listing => {
  const listing = listings.find((item) => item.city === citySlug && item.id === listingId);

  if (!listing) {
    notFound();
  }

  return listing;
};

export const getListingParams = () =>
  listings.map((listing) => ({
    city: listing.city,
    listingId: listing.id,
  }));

export const getCityEvents = (slug: CitySlug, limit?: number) => {
  const items = events.filter((item) => item.city === slug);
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const getCityServices = (slug: CitySlug, limit?: number) => {
  const items = services.filter((item) => item.city === slug);
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const getCityGuides = (slug: CitySlug, limit?: number) => {
  const items = guides.filter((item) => item.city === slug);
  return typeof limit === "number" ? items.slice(0, limit) : items;
};

export const getCityParams = () => cities.map((city) => ({ city: city.slug }));
