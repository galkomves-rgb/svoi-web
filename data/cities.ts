export type CitySlug = "torrevieja" | "alicante";

export type City = {
  slug: CitySlug;
  name: string;
  region: string;
  country: string;
  heroTitle: string;
  heroLead: string;
};

export const cities: City[] = [
  {
    slug: "torrevieja",
    name: "Торревʼєха",
    region: "Costa Blanca",
    country: "Іспанія",
    heroTitle: "Локальна платформа для українців у Торревʼєсі",
    heroLead: "Житло, події, послуги та корисні контакти в одному зрозумілому просторі.",
  },
  {
    slug: "alicante",
    name: "Аліканте",
    region: "Costa Blanca",
    country: "Іспанія",
    heroTitle: "Локальна платформа для українців в Аліканте",
    heroLead: "Швидкий доступ до оголошень, сервісів, подій і стартових гідів по місту.",
  },
];
