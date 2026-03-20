import { notFound } from "next/navigation";
import { cities, type City, type CitySlug } from "@/data/cities";
import { events } from "@/data/events";
import { guides } from "@/data/guides";
import { listings, type Listing } from "@/data/listings";
import { services } from "@/data/services";
import { datingProfiles } from "@/data/dating";
import { resources } from "@/data/resources";
import { realEstateRecords, type RealEstateRecord } from "@/data/real-estate";

export const citySections = [
  { key: "overview", label: "Огляд", href: "" },
  { key: "listings", label: "Оголошення", href: "/listings" },
  { key: "real-estate", label: "Нерухомість", href: "/real-estate" },
  { key: "events", label: "Події", href: "/events" },
  { key: "services", label: "Послуги", href: "/services" },
  { key: "guide", label: "Гід", href: "/guide" },
  { key: "dating", label: "Знайомства", href: "/dating" },
  { key: "resources", label: "Ресурси", href: "/resources" },
] as const;

export const listingCategoryGroups = {
  Усі: [],
  Житло: ["rent-offer", "rent-request", "sale-offer", "roommate-search"],
  Робота: ["hiring", "looking-for-work"],
  Послуги: ["need-help", "can-help", "local-request", "looking-for-contacts", "sell", "buy", "exchange"],
} as const;

export const listingCategories = Object.keys(listingCategoryGroups) as Array<keyof typeof listingCategoryGroups>;

export const listingTaxonomyLabels = {
  hiring: "Шукають працівника",
  "looking-for-work": "Шукаю роботу",
  "rent-offer": "Оренда: пропозиція",
  "rent-request": "Оренда: запит",
  "sale-offer": "Продаж",
  "roommate-search": "Пошук співмешканця",
  "need-help": "Потрібна допомога",
  "can-help": "Можу допомогти",
  sell: "Продам",
  buy: "Куплю",
  exchange: "Обмін",
  "local-request": "Локальний запит",
  "looking-for-contacts": "Шукаю контакти",
} as const;

export function getListingCategoryLabel(categorySlug: Listing["categorySlug"]) {
  if (listingCategoryGroups.Житло.includes(categorySlug as never)) return "Житло";
  if (listingCategoryGroups.Робота.includes(categorySlug as never)) return "Робота";
  return "Послуги";
}

export function getListingTaxonomyLabel(categorySlug: keyof typeof listingTaxonomyLabels | string) {
  return listingTaxonomyLabels[categorySlug as keyof typeof listingTaxonomyLabels] ?? categorySlug;
}

export const getCities = () => cities;

export const realEstateCategoryLabels = {
  all: "Усе житло",
  "rent-offer": "Оренда: пропозиції",
  "sale-offer": "Продаж",
  "rent-request": "Оренда: запити",
  "roommate-search": "Пошук співмешканців",
} as const;

export const realEstatePropertyTypeLabels = {
  apartment: "Квартира",
  studio: "Студія",
  house: "Будинок",
  room: "Кімната",
} as const;

export const searchModuleLabels = {
  all: "Усі модулі",
  listings: "Оголошення",
  services: "Послуги",
  events: "Події",
  guides: "Гіди",
} as const;

export const searchAuthorLabels = {
  all: "Усі автори",
  private_person: "Приватні",
  business: "Бізнес",
  community_org: "Організації",
  editorial: "Редакція",
  official: "Офіційно",
} as const;

export function getSearchModuleLabel(moduleKey: keyof typeof searchModuleLabels | string) {
  return searchModuleLabels[moduleKey as keyof typeof searchModuleLabels] ?? moduleKey;
}

export function getModuleLabel(moduleKey: string) {
  const labels: Record<string, string> = {
    listings: "Оголошення",
    "real-estate": "Нерухомість",
    services: "Послуги",
    events: "Події",
    guides: "Гіди",
    resources: "Ресурси",
    start: "Старт",
    search: "Пошук",
  };

  return labels[moduleKey] ?? moduleKey;
}

export function getModuleCategoryLabel(moduleKey: string, categorySlug: string) {
  if (moduleKey === "listings") return getListingTaxonomyLabel(categorySlug);
  if (moduleKey === "services") return getServiceCategoryLabel(categorySlug);
  if (moduleKey === "events") return getEventCategoryLabel(categorySlug);
  if (moduleKey === "guides") return getGuideCategoryLabel(categorySlug);
  if (moduleKey === "real-estate") return getRealEstateCategoryLabel(categorySlug);
  return categorySlug;
}

export function getRealEstateCategoryLabel(category: keyof typeof realEstateCategoryLabels | string) {
  return realEstateCategoryLabels[category as keyof typeof realEstateCategoryLabels] ?? category;
}

export function getRealEstatePropertyTypeLabel(propertyType: keyof typeof realEstatePropertyTypeLabels | string) {
  return realEstatePropertyTypeLabels[propertyType as keyof typeof realEstatePropertyTypeLabels] ?? propertyType;
}

export function getCityNameBySlug(slug: string) {
  return cities.find((city) => city.slug === slug)?.name ?? slug;
}

export function getSearchResultHref(result: { module: string; citySlug: string; entitySlug: string }) {
  if (result.module === "guides") {
    return `/${result.citySlug}/guide/${result.entitySlug}`;
  }

  return `/${result.citySlug}/${result.module}/${result.entitySlug}`;
}

export const getCity = (slug: string): City | undefined => cities.find((city) => city.slug === slug);

export const getCityOrThrow = (slug: string): City => {
  const city = getCity(slug);

  if (!city) {
    notFound();
  }

  return city;
};

export function getCityRealEstate(slug: CitySlug, limit?: number) {
  const items = realEstateRecords.filter((item) => item.citySlug === slug);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function filterCityRealEstate(
  slug: CitySlug,
  options?: {
    category?: string;
    sourceType?: string;
  },
) {
  const category = options?.category?.trim();
  const sourceType = options?.sourceType?.trim();

  return getCityRealEstate(slug).filter((item) => {
    const matchesCategory = !category || category === "all" ? true : item.category === category;
    const matchesSource = !sourceType || sourceType === "all" ? true : item.sourceType === sourceType;
    return matchesCategory && matchesSource;
  });
}

export function getRealEstateOrThrow(citySlug: CitySlug, slug: string): RealEstateRecord {
  const item = realEstateRecords.find((record) => record.citySlug === citySlug && record.slug === slug);
  if (!item) notFound();
  return item;
}

export function getRelatedRealEstate(citySlug: CitySlug, slug: string, limit = 3) {
  const current = getRealEstateOrThrow(citySlug, slug);

  return getCityRealEstate(citySlug)
    .filter((item) => item.slug !== current.slug)
    .sort((left, right) => {
      const categoryScore = Number(right.category === current.category) - Number(left.category === current.category);
      if (categoryScore !== 0) return categoryScore;
      return Number(right.featured) - Number(left.featured);
    })
    .slice(0, limit);
}

export function getRealEstateParams() {
  return realEstateRecords.map((item) => ({
    city: item.citySlug,
    slug: item.slug,
  }));
}

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

export const eventCategoryLabels = {
  all: "Усі",
  meetup: "Зустрічі",
  workshop: "Воркшопи",
  networking: "Нетворк",
  volunteering: "Волонтерство",
  family: "Сім'я",
  kids: "Діти",
  culture: "Культура",
  sport: "Спорт",
} as const;

export const eventTimeLabels = {
  all: "Усі дати",
  thisWeek: "Цього тижня",
  upcoming: "Далі",
} as const;

export const eventCategories = Object.keys(eventCategoryLabels) as Array<keyof typeof eventCategoryLabels>;
export const eventTimeScopes = Object.keys(eventTimeLabels) as Array<keyof typeof eventTimeLabels>;

export function getEventCategoryLabel(categorySlug: keyof typeof eventCategoryLabels | string) {
  return eventCategoryLabels[categorySlug as keyof typeof eventCategoryLabels] ?? categorySlug;
}

export function formatEventDateRange(startsAt: string, endsAt?: string | null) {
  const start = new Date(startsAt);
  const end = endsAt ? new Date(endsAt) : null;
  const startDate = start.toLocaleDateString("uk-UA", { day: "numeric", month: "long" });
  const startTime = start.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

  if (!end) {
    return `${startDate}, ${startTime}`;
  }

  const sameDay = start.toDateString() === end.toDateString();

  if (sameDay) {
    return `${startDate}, ${startTime}–${end.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}`;
  }

  return `${startDate}, ${startTime} → ${end.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })}, ${end.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function filterCityEvents(
  slug: CitySlug,
  options?: {
    category?: string;
    time?: string;
  },
) {
  const category = options?.category?.trim();
  const time = options?.time?.trim();
  const now = new Date("2026-03-20T12:00:00+01:00");
  const weekBoundary = new Date(now);
  weekBoundary.setDate(now.getDate() + 7);

  return getCityEvents(slug).filter((item) => {
    const matchesCategory = !category || category === "all" ? true : item.categorySlug === category;

    const startsAt = new Date(item.startsAt);
    const matchesTime =
      !time || time === "all"
        ? true
        : time === "thisWeek"
          ? startsAt >= now && startsAt <= weekBoundary
          : startsAt > weekBoundary;

    return matchesCategory && matchesTime;
  });
}

export function getRelatedEvents(citySlug: CitySlug, slug: string, limit = 3) {
  const current = getEventOrThrow(citySlug, slug);

  return getCityEvents(citySlug)
    .filter((item) => item.slug !== current.slug)
    .sort((left, right) => {
      const categoryScore = Number(right.categorySlug === current.categorySlug) - Number(left.categorySlug === current.categorySlug);
      if (categoryScore !== 0) return categoryScore;
      return new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime();
    })
    .slice(0, limit);
}

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

export const serviceCategoryLabels = {
  all: "Усі",
  legal: "Юридичні",
  translation: "Переклад",
  "real-estate": "Нерухомість",
  healthcare: "Здоров'я",
  beauty: "Краса",
  education: "Освіта",
  repairs: "Ремонт",
  transport: "Транспорт",
  finance: "Фінанси",
  psychology: "Психологія",
  childcare: "Догляд за дітьми",
} as const;

export const serviceAuthorLabels = {
  all: "Усі",
  business: "Бізнес",
  private_person: "Приватні",
  community_org: "Організації",
} as const;

export const serviceCategories = Object.keys(serviceCategoryLabels) as Array<keyof typeof serviceCategoryLabels>;
export const serviceAuthors = Object.keys(serviceAuthorLabels) as Array<keyof typeof serviceAuthorLabels>;

export function getServiceCategoryLabel(categorySlug: keyof typeof serviceCategoryLabels | string) {
  return serviceCategoryLabels[categorySlug as keyof typeof serviceCategoryLabels] ?? categorySlug;
}

export function filterCityServices(
  slug: CitySlug,
  options?: {
    category?: string;
    query?: string;
    author?: string;
    verifiedOnly?: boolean;
  },
) {
  const category = options?.category?.trim();
  const query = options?.query?.trim().toLowerCase();
  const author = options?.author?.trim();

  return getCityServices(slug).filter((item) => {
    const matchesCategory = !category || category === "all" ? true : item.categorySlug === category;
    const matchesAuthor = !author || author === "all" ? true : item.authorType === author;
    const matchesVerified = options?.verifiedOnly ? item.isVerified : true;
    const haystack = `${item.title} ${item.summary} ${item.body ?? ""} ${item.tags.join(" ")} ${item.addressText ?? ""}`.toLowerCase();
    const matchesQuery = !query ? true : haystack.includes(query);

    return matchesCategory && matchesAuthor && matchesVerified && matchesQuery;
  });
}

export function getRelatedServices(citySlug: CitySlug, slug: string, limit = 3) {
  const current = getServiceOrThrow(citySlug, slug);

  return getCityServices(citySlug)
    .filter((item) => item.slug !== current.slug)
    .sort((left, right) => {
      const categoryScore = Number(right.categorySlug === current.categorySlug) - Number(left.categorySlug === current.categorySlug);
      if (categoryScore !== 0) return categoryScore;
      return Number(right.featured) - Number(left.featured);
    })
    .slice(0, limit);
}

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

export const guideCategoryLabels = {
  all: "Усі",
  documents: "Документи",
  housing: "Житло",
  healthcare: "Здоров'я",
  banking: "Банки",
  education: "Освіта",
  transport: "Транспорт",
  "local-life": "Локальне життя",
} as const;

export const resourcePlatformLabels = {
  all: "Усі платформи",
  telegram: "Telegram",
  facebook: "Facebook",
  instagram: "Instagram",
  website: "Сайти",
} as const;

export const guideCategories = Object.keys(guideCategoryLabels) as Array<keyof typeof guideCategoryLabels>;

export function getGuideCategoryLabel(categorySlug: keyof typeof guideCategoryLabels | string) {
  return guideCategoryLabels[categorySlug as keyof typeof guideCategoryLabels] ?? categorySlug;
}

export function filterCityGuides(
  slug: CitySlug,
  options?: {
    category?: string;
    query?: string;
    featuredOnly?: boolean;
  },
) {
  const category = options?.category?.trim();
  const query = options?.query?.trim().toLowerCase();

  return getCityGuides(slug).filter((item) => {
    const matchesCategory = !category || category === "all" ? true : item.categorySlug === category;
    const matchesFeatured = options?.featuredOnly ? Boolean(item.featured) : true;
    const haystack = `${item.title} ${item.summary} ${item.body ?? ""} ${item.steps.join(" ")}`.toLowerCase();
    const matchesQuery = !query ? true : haystack.includes(query);

    return matchesCategory && matchesFeatured && matchesQuery;
  });
}

export function getGuideNextActions(citySlug: CitySlug, categorySlug: string) {
  if (categorySlug === "documents") {
    return [
      { title: "Юридичні та перекладацькі сервіси", href: `/${citySlug}/services?category=legal`, description: "Перевірені контакти для документів і супроводу." },
      { title: "Події та воркшопи", href: `/${citySlug}/events?category=workshop`, description: "Практичні сесії по NIE, записах і адаптації." },
    ];
  }

  if (categorySlug === "housing") {
    return [
      { title: "Оголошення по житлу", href: `/${citySlug}/listings?category=Житло`, description: "Оренда, запити та локальні житлові пропозиції." },
      { title: "Послуги для переїзду", href: `/${citySlug}/services?category=transport`, description: "Транспорт, переїзд і побутова логістика." },
    ];
  }

  if (categorySlug === "healthcare") {
    return [
      { title: "Медичні сервіси", href: `/${citySlug}/services?category=healthcare`, description: "Контакти й локальна підтримка по здоров'ю." },
      { title: "Почати зі Start", href: "/start", description: "Швидкий маршрут для новоприбулих по місту." },
    ];
  }

  return [
    { title: "Оголошення по місту", href: `/${citySlug}/listings`, description: "Практичні запити, робота і житло." },
    { title: "Локальні події", href: `/${citySlug}/events`, description: "Живі зв'язки, зустрічі і community-proof." },
  ];
}

export function getCityResources(slug: CitySlug, limit?: number) {
  const items = resources.filter((item) => item.citySlug === slug && item.status === "published" && item.visibility === "public");
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getResourcePlatformLabel(platform: keyof typeof resourcePlatformLabels | string) {
  return resourcePlatformLabels[platform as keyof typeof resourcePlatformLabels] ?? platform;
}

export function filterCityResources(
  slug: CitySlug,
  options?: {
    category?: string;
    platform?: string;
    featuredOnly?: boolean;
  },
) {
  const category = options?.category?.trim();
  const platform = options?.platform?.trim();

  return getCityResources(slug).filter((item) => {
    const matchesCategory = !category || category === "all" ? true : item.categorySlug === category;
    const matchesPlatform = !platform || platform === "all" ? true : item.platform === platform;
    const matchesFeatured = options?.featuredOnly ? Boolean(item.featured) : true;
    return matchesCategory && matchesPlatform && matchesFeatured;
  });
}

export function getRelatedGuides(citySlug: CitySlug, slug: string, limit = 3) {
  const current = getGuideOrThrow(citySlug, slug);

  return getCityGuides(citySlug)
    .filter((item) => item.slug !== current.slug)
    .sort((left, right) => {
      const categoryScore = Number(right.categorySlug === current.categorySlug) - Number(left.categorySlug === current.categorySlug);
      if (categoryScore !== 0) return categoryScore;
      return Number(right.featured) - Number(left.featured);
    })
    .slice(0, limit);
}

export const getGuideOrThrow = (citySlug: CitySlug, slug: string) => {
  const guide = guides.find((item) => item.citySlug === citySlug && item.slug === slug);
  if (!guide) notFound();
  return guide;
};

export const getGuideParams = () => guides.map((guide) => ({ city: guide.citySlug, slug: guide.slug }));

export const getCityParams = () => cities.map((city) => ({ city: city.slug }));

export const datingIntentLabels = {
  all: "Усі",
  friends: "Друзі",
  networking: "Нетворк",
  relationships: "Відносини",
} as const;

export function getCityDatingProfiles(slug: CitySlug, limit?: number) {
  const items = datingProfiles.filter((item) => item.citySlug === slug);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function filterCityDatingProfiles(
  slug: CitySlug,
  options?: {
    intent?: string;
    verifiedOnly?: boolean;
  },
) {
  const intent = options?.intent?.trim();

  return getCityDatingProfiles(slug).filter((item) => {
    const matchesIntent = !intent || intent === "all" ? true : item.intent === intent;
    const matchesVerified = options?.verifiedOnly ? item.verified : true;
    return matchesIntent && matchesVerified;
  });
}
