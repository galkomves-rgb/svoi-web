export type RealEstateCategory = "rent-offer" | "sale-offer" | "rent-request" | "roommate-search";

export type RealEstateRecord = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: RealEstateCategory;
  citySlug: "torrevieja" | "alicante";
  districtSlug?: string | null;
  addressText?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  googlePlaceId?: string | null;
  priceLabel?: string | null;
  propertyType: "apartment" | "studio" | "house" | "room";
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSqm?: number | null;
  furnished?: boolean;
  petsAllowed?: boolean;
  featured?: boolean;
  sourceType: "private_person" | "business";
  verified?: boolean;
  createdAt: string;
};

export const realEstateRecords: RealEstateRecord[] = [
  {
    id: "real-estate-torrevieja-rent-flat",
    slug: "orenda-apartment-playa-del-cura",
    title: "Оренда квартири біля Playa del Cura",
    summary: "2 спальні, мебльована кухня, 8 хвилин до моря, підходить для сімʼї.",
    body: "Квартира після косметичного ремонту. В будинку є ліфт, поруч супермаркети, школа й автобус. Власник просить 1 місяць депозиту та підтвердження доходу.",
    category: "rent-offer",
    citySlug: "torrevieja",
    districtSlug: "playa-del-cura",
    addressText: "Torrevieja, Playa del Cura",
    latitude: 37.9783,
    longitude: -0.6715,
    googlePlaceId: "ChIJ-real-estate-torrevieja-flat",
    priceLabel: "780 €/міс",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 1,
    areaSqm: 68,
    furnished: true,
    petsAllowed: false,
    featured: true,
    sourceType: "private_person",
    verified: false,
    createdAt: "2026-03-20T08:00:00Z",
  },
  {
    id: "real-estate-torrevieja-roommate",
    slug: "search-roommate-centro-torrevieja",
    title: "Пошук сусідки в квартиру в центрі",
    summary: "Окрема кімната, тихий будинок, зручно до транспорту й центру міста.",
    body: "Шукаємо дівчину або жінку на довгу оренду кімнати. У квартирі вже живе одна українка, умови спокійні, без вечірок. Комунальні частково включені.",
    category: "roommate-search",
    citySlug: "torrevieja",
    districtSlug: "centro",
    addressText: "Torrevieja, Centro",
    latitude: 37.978,
    longitude: -0.6829,
    googlePlaceId: "ChIJ-real-estate-torrevieja-room",
    priceLabel: "360 €/міс",
    propertyType: "room",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 14,
    furnished: true,
    petsAllowed: false,
    featured: false,
    sourceType: "private_person",
    verified: false,
    createdAt: "2026-03-18T09:00:00Z",
  },
  {
    id: "real-estate-alicante-sale-flat",
    slug: "prodazh-apartment-ensanche-alicante",
    title: "Продаж квартири в Ensanche, Alicante",
    summary: "Світла квартира з балконом, хороша інвестиція під власне проживання або оренду.",
    body: "3 кімнати, 2 санвузли, будинок після оновлення фасаду. Поруч центр, залізничний вокзал і магазини. Підійде як сімʼї, так і під довгострокову оренду.",
    category: "sale-offer",
    citySlug: "alicante",
    districtSlug: "ensanche",
    addressText: "Alicante, Ensanche",
    latitude: 38.3447,
    longitude: -0.4895,
    googlePlaceId: "ChIJ-real-estate-alicante-sale",
    priceLabel: "189 000 €",
    propertyType: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 92,
    furnished: false,
    petsAllowed: true,
    featured: true,
    sourceType: "business",
    verified: true,
    createdAt: "2026-03-19T10:00:00Z",
  },
  {
    id: "real-estate-alicante-rent-request",
    slug: "shukaiu-studio-san-blas",
    title: "Шукаю studio або pequeño piso в San Blas",
    summary: "Бюджет до 650 €, важливо поруч транспорт і без шумних сусідів.",
    body: "Шукаю невелике житло на довгу оренду. Працюю офіційно, є contrato. Розгляну San Blas, Centro і сусідні райони з хорошим сполученням.",
    category: "rent-request",
    citySlug: "alicante",
    districtSlug: "san-blas",
    addressText: "Alicante, San Blas",
    latitude: 38.3545,
    longitude: -0.4935,
    googlePlaceId: "ChIJ-real-estate-alicante-request",
    priceLabel: "до 650 €/міс",
    propertyType: "studio",
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 35,
    furnished: true,
    petsAllowed: false,
    featured: false,
    sourceType: "private_person",
    verified: false,
    createdAt: "2026-03-17T12:00:00Z",
  },
];
