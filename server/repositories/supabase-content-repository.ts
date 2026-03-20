import { MockContentRepository } from "./mock-content-repository";
import type {
  AuthorType,
  BusinessProfile,
  CategoryDefinition,
  CategorySchemaDefinition,
  City,
  ContentStatus,
  EventRecord,
  GuideRecord,
  ListingRecord,
  SearchIndexRecord,
  ServiceRecord,
  SubmissionRecord,
  Visibility,
} from "@/types/domain";
import type {
  AdminSummary,
  ContentRepository,
  CreateSubmissionInput,
  ListingFilters,
  ModerationTransitionInput,
  SearchFilters,
} from "./content-repository";
import { createSupabaseAdminClient } from "@/server/supabase/client";
import type { Database } from "@/types/database";

type CountryRow = Database["public"]["Tables"]["geography_countries"]["Row"];
type RegionRow = Database["public"]["Tables"]["geography_regions"]["Row"];
type CityRow = Database["public"]["Tables"]["geography_cities"]["Row"];
type DistrictRow = Database["public"]["Tables"]["geography_districts"]["Row"];
type ListingRow = Database["public"]["Tables"]["listings"]["Row"];
type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type EventRow = Database["public"]["Tables"]["events"]["Row"];
type GuideRow = Database["public"]["Tables"]["guides"]["Row"];
type BusinessProfileRow = Database["public"]["Tables"]["business_profiles"]["Row"];
type SubmissionRow = Database["public"]["Tables"]["submissions"]["Row"];
type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type CategorySchemaRow = Database["public"]["Tables"]["category_schemas"]["Row"];
type SearchIndexRow = Database["public"]["Tables"]["search_index"]["Row"];
type ReportRow = Database["public"]["Tables"]["reports"]["Row"];

type GeoMaps = {
  countriesById: Map<string, CountryRow>;
  regionsById: Map<string, RegionRow>;
  citiesById: Map<string, CityRow>;
  districtsById: Map<string, DistrictRow>;
};

const MODERATION_TABLES = ["submissions", "listings", "services", "events", "guides", "business_profiles"] as const;

function isModerationTable(value: string): value is (typeof MODERATION_TABLES)[number] {
  return MODERATION_TABLES.includes(value as (typeof MODERATION_TABLES)[number]);
}

function isPublishedPublic<T extends { status: string; visibility: string }>(item: T) {
  return item.status === "published" && item.visibility === "public";
}

export class SupabaseContentRepository implements ContentRepository {
  private fallback = new MockContentRepository();

  private getClient() {
    const client = createSupabaseAdminClient();

    if (!client) {
      throw new Error("Supabase admin client is not configured.");
    }

    return client as never;
  }

  private async getGeoMaps(): Promise<GeoMaps | null> {
    const client: any = this.getClient();
    const [{ data: countries, error: countriesError }, { data: regions, error: regionsError }, { data: cities, error: citiesError }, { data: districts, error: districtsError }] =
      await Promise.all([
        client.from("geography_countries").select("*"),
        client.from("geography_regions").select("*"),
        client.from("geography_cities").select("*"),
        client.from("geography_districts").select("*"),
      ]);

    if (countriesError || regionsError || citiesError || districtsError || !countries || !regions || !cities || !districts) {
      return null;
    }

    return {
      countriesById: new Map(countries.map((item: CountryRow) => [item.id, item])),
      regionsById: new Map(regions.map((item: RegionRow) => [item.id, item])),
      citiesById: new Map(cities.map((item: CityRow) => [item.id, item])),
      districtsById: new Map(districts.map((item: DistrictRow) => [item.id, item])),
    };
  }

  private async getBusinessProfileSlugMap() {
    const client: any = this.getClient();
    const { data, error } = await client.from("business_profiles").select("id, slug");

    if (error || !data) {
      return new Map<string, string>();
    }

    return new Map<string, string>(data.map((item: Pick<BusinessProfileRow, "id" | "slug">) => [item.id, item.slug]));
  }

  private mapCity(item: CityRow, geoMaps: GeoMaps): City | null {
    const region = geoMaps.regionsById.get(item.region_id);
    const country = region ? geoMaps.countriesById.get(region.country_id) : null;

    if (!region || !country) {
      return null;
    }

    return {
      id: item.id,
      countrySlug: country.slug,
      regionSlug: region.slug,
      slug: item.slug,
      name: item.name,
      heroTitle: item.hero_title ?? `Платформа для українців у ${item.name}`,
      heroLead: item.hero_lead ?? "Локальні оголошення, сервіси, події та гіди.",
    };
  }

  private mapListing(item: ListingRow, geoMaps: GeoMaps, businessSlugMap: Map<string, string>): ListingRecord | null {
    const city = geoMaps.citiesById.get(item.city_id);
    const region = city ? geoMaps.regionsById.get(city.region_id) : null;
    const country = region ? geoMaps.countriesById.get(region.country_id) : null;
    const district = item.district_id ? geoMaps.districtsById.get(item.district_id) : null;

    if (!city || !region || !country) {
      return null;
    }

    return {
      id: item.id,
      slug: item.slug,
      module: "listings",
      title: item.title,
      summary: item.summary,
      body: item.body ?? "",
      categorySlug: item.category_slug as ListingRecord["categorySlug"],
      status: item.status as ContentStatus,
      visibility: item.visibility as Visibility,
      authorType: item.author_type as AuthorType,
      isVerified: item.is_verified,
      businessProfileSlug: item.business_profile_id ? businessSlugMap.get(item.business_profile_id) ?? null : null,
      ownerProfileId: item.owner_profile_id,
      countrySlug: country.slug,
      regionSlug: region.slug,
      citySlug: city.slug,
      districtSlug: district?.slug ?? null,
      geoScopeType: item.geo_scope_type as ListingRecord["geoScopeType"],
      addressText: item.address_text,
      latitude: item.latitude,
      longitude: item.longitude,
      googlePlaceId: item.google_place_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      publishedAt: item.published_at,
      expiresAt: item.expires_at,
      moderationNotes: null,
      featured: item.featured,
      priceLabel: item.price_label,
      tags: item.tags ?? [],
    };
  }

  private mapService(item: ServiceRow, geoMaps: GeoMaps, businessSlugMap: Map<string, string>): ServiceRecord | null {
    const city = geoMaps.citiesById.get(item.city_id);
    const region = city ? geoMaps.regionsById.get(city.region_id) : null;
    const country = region ? geoMaps.countriesById.get(region.country_id) : null;
    const district = item.district_id ? geoMaps.districtsById.get(item.district_id) : null;

    if (!city || !region || !country) {
      return null;
    }

    return {
      id: item.id,
      slug: item.slug,
      module: "services",
      title: item.title,
      summary: item.summary,
      body: item.body ?? "",
      categorySlug: item.category_slug as ServiceRecord["categorySlug"],
      status: item.status as ContentStatus,
      visibility: item.visibility as Visibility,
      authorType: item.author_type as AuthorType,
      isVerified: item.is_verified,
      businessProfileSlug: item.business_profile_id ? businessSlugMap.get(item.business_profile_id) ?? null : null,
      ownerProfileId: item.owner_profile_id,
      countrySlug: country.slug,
      regionSlug: region.slug,
      citySlug: city.slug,
      districtSlug: district?.slug ?? null,
      geoScopeType: item.geo_scope_type as ServiceRecord["geoScopeType"],
      addressText: item.address_text,
      latitude: item.latitude,
      longitude: item.longitude,
      googlePlaceId: item.google_place_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      publishedAt: item.published_at,
      expiresAt: item.expires_at,
      moderationNotes: null,
      featured: item.featured,
      contactLabel: item.contact_label,
      tags: item.tags ?? [],
    };
  }

  private mapEvent(item: EventRow, geoMaps: GeoMaps, businessSlugMap: Map<string, string>): EventRecord | null {
    const city = geoMaps.citiesById.get(item.city_id);
    const region = city ? geoMaps.regionsById.get(city.region_id) : null;
    const country = region ? geoMaps.countriesById.get(region.country_id) : null;
    const district = item.district_id ? geoMaps.districtsById.get(item.district_id) : null;

    if (!city || !region || !country) {
      return null;
    }

    return {
      id: item.id,
      slug: item.slug,
      module: "events",
      title: item.title,
      summary: item.summary,
      body: item.body ?? "",
      categorySlug: item.category_slug as EventRecord["categorySlug"],
      status: item.status as ContentStatus,
      visibility: item.visibility as Visibility,
      authorType: item.author_type as AuthorType,
      isVerified: item.is_verified,
      businessProfileSlug: item.business_profile_id ? businessSlugMap.get(item.business_profile_id) ?? null : null,
      ownerProfileId: item.owner_profile_id,
      countrySlug: country.slug,
      regionSlug: region.slug,
      citySlug: city.slug,
      districtSlug: district?.slug ?? null,
      geoScopeType: item.geo_scope_type as EventRecord["geoScopeType"],
      addressText: item.address_text,
      latitude: item.latitude,
      longitude: item.longitude,
      googlePlaceId: item.google_place_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      publishedAt: item.published_at,
      expiresAt: item.expires_at,
      moderationNotes: null,
      featured: item.featured,
      startsAt: item.starts_at,
      endsAt: item.ends_at,
      ctaLabel: "Піти на подію",
    };
  }

  private mapGuide(item: GuideRow, geoMaps: GeoMaps): GuideRecord | null {
    const city = geoMaps.citiesById.get(item.city_id);
    const region = city ? geoMaps.regionsById.get(city.region_id) : null;
    const country = region ? geoMaps.countriesById.get(region.country_id) : null;
    const district = item.district_id ? geoMaps.districtsById.get(item.district_id) : null;

    if (!city || !region || !country) {
      return null;
    }

    return {
      id: item.id,
      slug: item.slug,
      module: "guides",
      title: item.title,
      summary: item.summary,
      body: item.body ?? "",
      categorySlug: item.category_slug as GuideRecord["categorySlug"],
      status: item.status as ContentStatus,
      visibility: item.visibility as Visibility,
      authorType: item.author_type as AuthorType,
      isVerified: item.is_verified,
      businessProfileSlug: null,
      ownerProfileId: null,
      countrySlug: country.slug,
      regionSlug: region.slug,
      citySlug: city.slug,
      districtSlug: district?.slug ?? null,
      geoScopeType: item.geo_scope_type as GuideRecord["geoScopeType"],
      addressText: null,
      latitude: null,
      longitude: null,
      googlePlaceId: null,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      publishedAt: item.published_at,
      expiresAt: null,
      moderationNotes: null,
      featured: item.featured,
      steps: item.steps ?? [],
    };
  }

  private mapBusinessProfile(item: BusinessProfileRow, geoMaps: GeoMaps): BusinessProfile | null {
    const city = geoMaps.citiesById.get(item.city_id);
    const region = geoMaps.regionsById.get(item.region_id);
    const country = geoMaps.countriesById.get(item.country_id);
    const district = item.district_id ? geoMaps.districtsById.get(item.district_id) : null;

    if (!city || !region || !country) {
      return null;
    }

    return {
      id: item.id,
      slug: item.slug,
      name: item.name,
      summary: item.summary,
      description: item.description,
      status: item.status as ContentStatus,
      visibility: item.visibility as Visibility,
      isVerified: item.is_verified,
      categorySlug: item.category_slug as BusinessProfile["categorySlug"],
      websiteUrl: item.website_url,
      contactLabel: item.contact_label,
      countrySlug: country.slug,
      regionSlug: region.slug,
      citySlug: city.slug,
      districtSlug: district?.slug ?? null,
      geoScopeType: "city",
      addressText: item.address_text,
      latitude: item.latitude,
      longitude: item.longitude,
      googlePlaceId: item.google_place_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    };
  }

  private mapSubmission(item: SubmissionRow, geoMaps: GeoMaps, businessSlugMap: Map<string, string>): SubmissionRecord | null {
    const city = geoMaps.citiesById.get(item.city_id);
    const region = geoMaps.regionsById.get(item.region_id);
    const country = geoMaps.countriesById.get(item.country_id);
    const district = item.district_id ? geoMaps.districtsById.get(item.district_id) : null;

    if (!city || !region || !country) {
      return null;
    }

    return {
      id: item.id,
      module: item.module_key as SubmissionRecord["module"],
      categorySlug: item.category_slug,
      title: item.title,
      summary: item.summary,
      body: item.body ?? "",
      authorType: item.author_type as AuthorType,
      businessProfileSlug: item.business_profile_id ? businessSlugMap.get(item.business_profile_id) ?? null : null,
      payload: (item.payload as Record<string, unknown>) ?? {},
      status: item.status as SubmissionRecord["status"],
      geoScopeType: item.geo_scope_type as SubmissionRecord["geoScopeType"],
      countrySlug: country.slug,
      regionSlug: region.slug,
      citySlug: city.slug,
      districtSlug: district?.slug ?? null,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    };
  }

  async listCities() {
    try {
      const geoMaps = await this.getGeoMaps();

      if (!geoMaps) {
        return this.fallback.listCities();
      }

      return Array.from(geoMaps.citiesById.values())
        .map((item) => this.mapCity(item, geoMaps))
        .filter((item): item is City => Boolean(item))
        .sort((left, right) => left.name.localeCompare(right.name, "uk"));
    } catch {
      return this.fallback.listCities();
    }
  }

  async getCity(slug: string) {
    const cities = await this.listCities();
    return cities.find((item: { slug: string }) => item.slug === slug) ?? null;
  }

  async listCategories() {
    try {
      const client: any = this.getClient();
      const { data, error } = await client.from("categories").select("*").order("module_key").order("label");

      if (error || !data) {
        return this.fallback.listCategories();
      }

      return data.map((item: CategoryRow): CategoryDefinition => ({
        id: item.id,
        module: item.module_key as CategoryDefinition["module"],
        slug: item.slug,
        label: item.label,
        schemaKey: item.schema_key,
        parentSlug: item.parent_slug,
      }));
    } catch {
      return this.fallback.listCategories();
    }
  }

  async listCategorySchemas() {
    try {
      const client: any = this.getClient();
      const { data, error } = await client.from("category_schemas").select("*").order("module_key").order("title");

      if (error || !data) {
        return this.fallback.listCategorySchemas();
      }

      return data.map((item: CategorySchemaRow): CategorySchemaDefinition => ({
        key: item.schema_key,
        module: item.module_key as CategorySchemaDefinition["module"],
        title: item.title,
        fields: Array.isArray(item.fields_json) ? (item.fields_json as CategorySchemaDefinition["fields"]) : [],
      }));
    } catch {
      return this.fallback.listCategorySchemas();
    }
  }

  async listListings(filters?: ListingFilters) {
    try {
      const client: any = this.getClient();
      const [geoMaps, businessSlugMap] = await Promise.all([this.getGeoMaps(), this.getBusinessProfileSlugMap()]);

      if (!geoMaps) {
        return this.fallback.listListings(filters);
      }

      let query = client
        .from("listings")
        .select("*")
        .eq("status", "published")
        .eq("visibility", "public")
        .order("featured", { ascending: false })
        .order("published_at", { ascending: false });

      if (filters?.featuredOnly) {
        query = query.eq("featured", true);
      }

      if (filters?.categorySlug) {
        query = query.eq("category_slug", filters.categorySlug);
      }

      const { data, error } = await query;

      if (error || !data) {
        return this.fallback.listListings(filters);
      }

      let items = data
        .map((item: ListingRow) => this.mapListing(item, geoMaps, businessSlugMap))
        .filter((item: ListingRecord | null): item is ListingRecord => Boolean(item));

      if (filters?.citySlug) {
        items = items.filter((item: ListingRecord) => item.citySlug === filters.citySlug);
      }

      if (filters?.query) {
        const needle = filters.query.toLowerCase();
        items = items.filter((item: ListingRecord) =>
          `${item.title} ${item.summary} ${item.body ?? ""} ${item.tags.join(" ")}`.toLowerCase().includes(needle),
        );
      }

      return items;
    } catch {
      return this.fallback.listListings(filters);
    }
  }

  async getListing(citySlug: string, slug: string) {
    try {
      const client: any = this.getClient();
      const [geoMaps, businessSlugMap] = await Promise.all([this.getGeoMaps(), this.getBusinessProfileSlugMap()]);

      if (!geoMaps) {
        return this.fallback.getListing(citySlug, slug);
      }

      const { data, error } = await client
        .from("listings")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .eq("visibility", "public")
        .maybeSingle();

      if (error || !data) {
        return this.fallback.getListing(citySlug, slug);
      }

      const item = this.mapListing(data as ListingRow, geoMaps, businessSlugMap);
      if (!item || item.citySlug !== citySlug) {
        return null;
      }

      return item;
    } catch {
      return this.fallback.getListing(citySlug, slug);
    }
  }

  async listServices(citySlug?: string) {
    try {
      const client: any = this.getClient();
      const [geoMaps, businessSlugMap] = await Promise.all([this.getGeoMaps(), this.getBusinessProfileSlugMap()]);

      if (!geoMaps) {
        return this.fallback.listServices(citySlug);
      }

      const { data, error } = await client
        .from("services")
        .select("*")
        .eq("status", "published")
        .eq("visibility", "public")
        .order("featured", { ascending: false })
        .order("published_at", { ascending: false });

      if (error || !data) {
        return this.fallback.listServices(citySlug);
      }

      let items = data
        .map((item: ServiceRow) => this.mapService(item, geoMaps, businessSlugMap))
        .filter((item: ServiceRecord | null): item is ServiceRecord => Boolean(item));

      if (citySlug) {
        items = items.filter((item: ServiceRecord) => item.citySlug === citySlug);
      }

      return items;
    } catch {
      return this.fallback.listServices(citySlug);
    }
  }

  async getService(citySlug: string, slug: string) {
    try {
      const client: any = this.getClient();
      const [geoMaps, businessSlugMap] = await Promise.all([this.getGeoMaps(), this.getBusinessProfileSlugMap()]);

      if (!geoMaps) {
        return this.fallback.getService(citySlug, slug);
      }

      const { data, error } = await client
        .from("services")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .eq("visibility", "public")
        .maybeSingle();

      if (error || !data) {
        return this.fallback.getService(citySlug, slug);
      }

      const item = this.mapService(data as ServiceRow, geoMaps, businessSlugMap);
      if (!item || item.citySlug !== citySlug) {
        return null;
      }

      return item;
    } catch {
      return this.fallback.getService(citySlug, slug);
    }
  }

  async listEvents(citySlug?: string) {
    try {
      const client: any = this.getClient();
      const [geoMaps, businessSlugMap] = await Promise.all([this.getGeoMaps(), this.getBusinessProfileSlugMap()]);

      if (!geoMaps) {
        return this.fallback.listEvents(citySlug);
      }

      const { data, error } = await client
        .from("events")
        .select("*")
        .eq("status", "published")
        .eq("visibility", "public")
        .order("starts_at", { ascending: true });

      if (error || !data) {
        return this.fallback.listEvents(citySlug);
      }

      let items = data
        .map((item: EventRow) => this.mapEvent(item, geoMaps, businessSlugMap))
        .filter((item: EventRecord | null): item is EventRecord => Boolean(item));

      if (citySlug) {
        items = items.filter((item: EventRecord) => item.citySlug === citySlug);
      }

      return items;
    } catch {
      return this.fallback.listEvents(citySlug);
    }
  }

  async getEvent(citySlug: string, slug: string) {
    try {
      const client: any = this.getClient();
      const [geoMaps, businessSlugMap] = await Promise.all([this.getGeoMaps(), this.getBusinessProfileSlugMap()]);

      if (!geoMaps) {
        return this.fallback.getEvent(citySlug, slug);
      }

      const { data, error } = await client
        .from("events")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .eq("visibility", "public")
        .maybeSingle();

      if (error || !data) {
        return this.fallback.getEvent(citySlug, slug);
      }

      const item = this.mapEvent(data as EventRow, geoMaps, businessSlugMap);
      if (!item || item.citySlug !== citySlug) {
        return null;
      }

      return item;
    } catch {
      return this.fallback.getEvent(citySlug, slug);
    }
  }

  async listGuides(citySlug?: string) {
    try {
      const client: any = this.getClient();
      const geoMaps = await this.getGeoMaps();

      if (!geoMaps) {
        return this.fallback.listGuides(citySlug);
      }

      const { data, error } = await client
        .from("guides")
        .select("*")
        .eq("status", "published")
        .eq("visibility", "public")
        .order("featured", { ascending: false })
        .order("published_at", { ascending: false });

      if (error || !data) {
        return this.fallback.listGuides(citySlug);
      }

      let items = data
        .map((item: GuideRow) => this.mapGuide(item, geoMaps))
        .filter((item: GuideRecord | null): item is GuideRecord => Boolean(item));

      if (citySlug) {
        items = items.filter((item: GuideRecord) => item.citySlug === citySlug);
      }

      return items;
    } catch {
      return this.fallback.listGuides(citySlug);
    }
  }

  async getGuide(citySlug: string, slug: string) {
    try {
      const client: any = this.getClient();
      const geoMaps = await this.getGeoMaps();

      if (!geoMaps) {
        return this.fallback.getGuide(citySlug, slug);
      }

      const { data, error } = await client
        .from("guides")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .eq("visibility", "public")
        .maybeSingle();

      if (error || !data) {
        return this.fallback.getGuide(citySlug, slug);
      }

      const item = this.mapGuide(data as GuideRow, geoMaps);
      if (!item || item.citySlug !== citySlug) {
        return null;
      }

      return item;
    } catch {
      return this.fallback.getGuide(citySlug, slug);
    }
  }

  async getBusinessProfile(slug: string) {
    try {
      const client: any = this.getClient();
      const geoMaps = await this.getGeoMaps();

      if (!geoMaps) {
        return this.fallback.getBusinessProfile(slug);
      }

      const { data, error } = await client
        .from("business_profiles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .eq("visibility", "public")
        .maybeSingle();

      if (error || !data) {
        return this.fallback.getBusinessProfile(slug);
      }

      return this.mapBusinessProfile(data as BusinessProfileRow, geoMaps);
    } catch {
      return this.fallback.getBusinessProfile(slug);
    }
  }

  async search(filters: SearchFilters) {
    try {
      const client: any = this.getClient();
      let query = client.from("search_index").select("*").order("featured", { ascending: false }).order("published_at", { ascending: false });

      if (filters.citySlug) {
        query = query.eq("city_slug", filters.citySlug);
      }

      if (filters.module) {
        query = query.eq("module_key", filters.module);
      }

      if (filters.categorySlug) {
        query = query.eq("category_slug", filters.categorySlug);
      }

      if (filters.authorType) {
        query = query.eq("author_type", filters.authorType);
      }

      if (filters.featuredOnly) {
        query = query.eq("featured", true);
      }

      if (filters.business === "business") {
        query = query.eq("is_business", true);
      }

      if (filters.business === "private") {
        query = query.eq("is_business", false);
      }

      if (filters.query) {
        query = query.or(`title.ilike.%${filters.query}%,summary.ilike.%${filters.query}%,body_text.ilike.%${filters.query}%`);
      }

      const { data, error } = await query;

      if (error || !data) {
        return this.fallback.search(filters);
      }

      return data.map(
        (item: SearchIndexRow): SearchIndexRecord => ({
          id: item.id,
          module: item.module_key as SearchIndexRecord["module"],
          entityId: item.entity_id,
          entitySlug: item.entity_slug,
          title: item.title,
          summary: item.summary,
          bodyText: item.body_text,
          categorySlug: item.category_slug,
          citySlug: item.city_slug,
          authorType: item.author_type as AuthorType,
          featured: item.featured,
          publishedAt: item.published_at,
        }),
      );
    } catch {
      return this.fallback.search(filters);
    }
  }

  async createSubmission(input: CreateSubmissionInput) {
    const client: any = this.getClient();

    try {
      const { data, error } = await client
        .from("submissions")
        .insert({
          module_key: input.module,
          category_slug: input.categorySlug,
          title: input.title,
          summary: input.summary,
          body: input.body ?? null,
          author_type: input.authorType,
          business_profile_id: null,
          payload: input.payload,
          geo_scope_type: input.geoScopeType,
          country_id: input.countrySlug,
          region_id: input.regionSlug,
          city_id: input.citySlug,
          district_id: input.districtSlug ?? null,
          status: input.status ?? "pending_review",
        })
        .select("*")
        .single();

      if (error || !data) {
        return this.fallback.createSubmission(input);
      }

      return {
        id: data.id,
        module: data.module_key,
        categorySlug: data.category_slug,
        title: data.title,
        summary: data.summary,
        body: data.body ?? "",
        authorType: data.author_type,
        businessProfileSlug: null,
        payload: data.payload ?? {},
        status: data.status,
        geoScopeType: data.geo_scope_type,
        countrySlug: data.country_id,
        regionSlug: data.region_id,
        citySlug: data.city_id,
        districtSlug: data.district_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    } catch {
      return this.fallback.createSubmission(input);
    }
  }

  async listSubmissions() {
    try {
      const client: any = this.getClient();
      const [geoMaps, businessSlugMap] = await Promise.all([this.getGeoMaps(), this.getBusinessProfileSlugMap()]);

      if (!geoMaps) {
        return this.fallback.listSubmissions();
      }

      const { data, error } = await client.from("submissions").select("*").order("created_at", { ascending: false });

      if (error || !data) {
        return this.fallback.listSubmissions();
      }

      return data
        .map((item: SubmissionRow) => this.mapSubmission(item, geoMaps, businessSlugMap))
        .filter((item: SubmissionRecord | null): item is SubmissionRecord => Boolean(item));
    } catch {
      return this.fallback.listSubmissions();
    }
  }

  async getModerationStatus(entityTable: string, entityId: string): Promise<ContentStatus | null> {
    if (!isModerationTable(entityTable)) {
      return null;
    }

    try {
      const client: any = this.getClient();
      const { data, error } = await client.from(entityTable).select("status").eq("id", entityId).maybeSingle();

      if (error || !data) {
        return this.fallback.getModerationStatus(entityTable, entityId);
      }

      return (data.status as ContentStatus) ?? null;
    } catch {
      return this.fallback.getModerationStatus(entityTable, entityId);
    }
  }

  async transitionModeration(input: ModerationTransitionInput) {
    if (!isModerationTable(input.entityTable)) {
      throw new Error("Unsupported moderation target.");
    }

    try {
      const client: any = this.getClient();
      const currentStatus = await this.getModerationStatus(input.entityTable, input.entityId);

      if (!currentStatus) {
        throw new Error("Moderation target was not found.");
      }

      const nextVisibility =
        input.nextStatus === "published"
          ? "public"
          : input.nextStatus === "rejected" || input.nextStatus === "archived"
            ? "hidden_by_moderation"
            : undefined;

      const updatePayload: Record<string, unknown> = {
        status: input.nextStatus,
      };

      if (nextVisibility && input.entityTable !== "submissions") {
        updatePayload.visibility = nextVisibility;
      }

      if (input.nextStatus === "published" && input.entityTable !== "submissions") {
        updatePayload.published_at = new Date().toISOString();
      }

      const { error: updateError } = await client.from(input.entityTable).update(updatePayload).eq("id", input.entityId);

      if (updateError) {
        throw updateError;
      }

      const action =
        input.nextStatus === "changes_requested"
          ? "requested_changes"
          : input.nextStatus === "approved"
            ? "approved"
            : input.nextStatus === "published"
              ? "published"
              : input.nextStatus === "rejected"
                ? "rejected"
                : "archived";

      await client.from("moderation_logs").insert({
        entity_table: input.entityTable,
        entity_id: input.entityId,
        action,
        previous_status: currentStatus,
        next_status: input.nextStatus,
        note: input.note ?? null,
      });

      return input;
    } catch {
      return this.fallback.transitionModeration(input);
    }
  }

  async listReports() {
    try {
      const client: any = this.getClient();
      const { data, error } = await client.from("reports").select("*").order("created_at", { ascending: false });

      if (error || !data) {
        return this.fallback.listReports();
      }

      return data.map((item: ReportRow) => ({
        id: item.id,
        entityTable: item.entity_table,
        entityId: item.entity_id,
        reason: item.reason,
        status: item.status as "open" | "reviewing" | "resolved",
        createdAt: item.created_at,
      }));
    } catch {
      return this.fallback.listReports();
    }
  }

  async getAdminSummary(): Promise<AdminSummary> {
    try {
      const client: any = this.getClient();
      const [{ count: pendingSubmissions }, { count: openReports }, { data: listingData }, { data: serviceData }, { data: eventData }, { data: guideData }] =
        await Promise.all([
          client.from("submissions").select("*", { count: "exact", head: true }).eq("status", "pending_review"),
          client.from("reports").select("*", { count: "exact", head: true }).eq("status", "open"),
          client.from("listings").select("status, visibility"),
          client.from("services").select("status, visibility"),
          client.from("events").select("status, visibility"),
          client.from("guides").select("status, visibility"),
        ]);

      return {
        pendingSubmissions: pendingSubmissions ?? 0,
        openReports: openReports ?? 0,
        publishedListings: Array.isArray(listingData) ? listingData.filter(isPublishedPublic).length : 0,
        publishedServices: Array.isArray(serviceData) ? serviceData.filter(isPublishedPublic).length : 0,
        upcomingEvents: Array.isArray(eventData) ? eventData.filter(isPublishedPublic).length : 0,
        publishedGuides: Array.isArray(guideData) ? guideData.filter(isPublishedPublic).length : 0,
      };
    } catch {
      return this.fallback.getAdminSummary();
    }
  }
}
