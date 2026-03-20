import type { City, Country, District, Region } from "@/types/domain";

export const countries: Country[] = [
  {
    id: "country-spain",
    slug: "spain",
    code: "ES",
    name: "Іспанія",
  },
];

export const regions: Region[] = [
  {
    id: "region-valencia",
    countrySlug: "spain",
    slug: "valencia",
    name: "Comunidad Valenciana",
  },
];

export const cities: City[] = [
  {
    id: "city-torrevieja",
    countrySlug: "spain",
    regionSlug: "valencia",
    slug: "torrevieja",
    name: "Торревʼєха",
    heroTitle: "Локальна платформа для українців у Торревʼєсі",
    heroLead: "Житло, події, послуги та корисні контакти в одному зрозумілому просторі.",
  },
  {
    id: "city-alicante",
    countrySlug: "spain",
    regionSlug: "valencia",
    slug: "alicante",
    name: "Аліканте",
    heroTitle: "Локальна платформа для українців в Аліканте",
    heroLead: "Швидкий доступ до оголошень, сервісів, подій і стартових гідів по місту.",
  },
];

export const districts: District[] = [
  { id: "district-torrevieja-playa-del-cura", citySlug: "torrevieja", slug: "playa-del-cura", name: "Playa del Cura" },
  { id: "district-torrevieja-centro", citySlug: "torrevieja", slug: "centro", name: "Centro" },
  { id: "district-torrevieja-marina", citySlug: "torrevieja", slug: "marina", name: "Marina" },
  { id: "district-alicante-centro", citySlug: "alicante", slug: "centro", name: "Centro" },
  { id: "district-alicante-san-blas", citySlug: "alicante", slug: "san-blas", name: "San Blas" },
  { id: "district-alicante-ensanche", citySlug: "alicante", slug: "ensanche", name: "Ensanche" },
];
