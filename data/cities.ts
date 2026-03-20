import { cities as geographyCities } from "./geography";

export type CitySlug = "torrevieja" | "alicante";

export type City = {
  slug: CitySlug;
  name: string;
  region: string;
  country: string;
  heroTitle: string;
  heroLead: string;
};

export const cities: City[] = geographyCities.map((city) => ({
  slug: city.slug as CitySlug,
  name: city.name,
  region: "Costa Blanca",
  country: "Іспанія",
  heroTitle: city.heroTitle,
  heroLead: city.heroLead,
}));
