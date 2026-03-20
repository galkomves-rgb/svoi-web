import { MockContentRepository } from "./mock-content-repository";
import type {
  AdminSummary,
  ContentRepository,
  CreateSubmissionInput,
  ListingFilters,
  ModerationTransitionInput,
  SearchFilters,
} from "./content-repository";
import { createSupabaseAdminClient } from "@/server/supabase/client";

export class SupabaseContentRepository implements ContentRepository {
  private fallback = new MockContentRepository();

  private getClient() {
    const client = createSupabaseAdminClient();

    if (!client) {
      throw new Error("Supabase admin client is not configured.");
    }

    return client as never;
  }

  async listCities() {
    const client: any = this.getClient();
    const { data, error } = await client.from("geography_cities").select("*").order("name");
    if (error) throw error;
    if (!data) return this.fallback.listCities();

    return data.map((item: any) => ({
      id: item.id,
      countrySlug: "spain",
      regionSlug: "valencia",
      slug: item.slug,
      name: item.name,
      heroTitle: item.hero_title ?? `Платформа для українців у ${item.name}`,
      heroLead: item.hero_lead ?? "Локальні оголошення, сервіси, події та гіди.",
    }));
  }

  async getCity(slug: string) {
    const cities = await this.listCities();
    return cities.find((item: { slug: string }) => item.slug === slug) ?? null;
  }

  async listCategories() {
    return this.fallback.listCategories();
  }

  async listCategorySchemas() {
    return this.fallback.listCategorySchemas();
  }

  async listListings(filters?: ListingFilters) {
    if (!filters) return this.fallback.listListings();
    return this.fallback.listListings(filters);
  }

  async getListing(citySlug: string, slug: string) {
    return this.fallback.getListing(citySlug, slug);
  }

  async listServices(citySlug?: string) {
    return this.fallback.listServices(citySlug);
  }

  async getService(citySlug: string, slug: string) {
    return this.fallback.getService(citySlug, slug);
  }

  async listEvents(citySlug?: string) {
    return this.fallback.listEvents(citySlug);
  }

  async getEvent(citySlug: string, slug: string) {
    return this.fallback.getEvent(citySlug, slug);
  }

  async listGuides(citySlug?: string) {
    return this.fallback.listGuides(citySlug);
  }

  async getGuide(citySlug: string, slug: string) {
    return this.fallback.getGuide(citySlug, slug);
  }

  async getBusinessProfile(slug: string) {
    return this.fallback.getBusinessProfile(slug);
  }

  async search(filters: SearchFilters) {
    return this.fallback.search(filters);
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
    return this.fallback.listSubmissions();
  }

  async transitionModeration(input: ModerationTransitionInput) {
    return input;
  }

  async listReports() {
    return this.fallback.listReports();
  }

  async getAdminSummary(): Promise<AdminSummary> {
    return this.fallback.getAdminSummary();
  }
}
