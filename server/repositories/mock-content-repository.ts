import { businessProfiles } from "@/data/business-profiles";
import { categories, categorySchemas } from "@/data/categories";
import { cities } from "@/data/geography";
import { events } from "@/data/events";
import { guides } from "@/data/guides";
import { listings } from "@/data/listings";
import { realEstateRecords } from "@/data/real-estate";
import { reports, submissions } from "@/data/submissions";
import { resources } from "@/data/resources";
import { services } from "@/data/services";
import type { ContentStatus, RealEstateRecord, SearchIndexRecord } from "@/types/domain";
import type {
  AdminSummary,
  ContentRepository,
  CreateSubmissionInput,
  ListingFilters,
  ModerationTransitionInput,
  SearchFilters,
} from "./content-repository";

const isPublishedPublic = <T extends { status: string; visibility: string }>(item: T) =>
  item.status === "published" && item.visibility === "public";

function toSearchIndex(): SearchIndexRecord[] {
  return [
    ...listings.filter(isPublishedPublic).map((item) => ({
      id: `search-${item.id}`,
      module: "listings" as const,
      entityId: item.id,
      entitySlug: item.slug,
      title: item.title,
      summary: item.summary,
      bodyText: item.body ?? "",
      categorySlug: item.categorySlug,
      citySlug: item.citySlug,
      authorType: item.authorType,
      featured: Boolean(item.featured),
      publishedAt: item.publishedAt,
    })),
    ...realEstateRecords.filter(isPublishedPublic).map((item) => ({
      id: `search-${item.id}`,
      module: "real-estate" as const,
      entityId: item.id,
      entitySlug: item.slug,
      title: item.title,
      summary: item.summary,
      bodyText: item.body ?? "",
      categorySlug: item.categorySlug,
      citySlug: item.citySlug,
      authorType: item.authorType,
      featured: Boolean(item.featured),
      publishedAt: item.publishedAt,
    })),
    ...services.filter(isPublishedPublic).map((item) => ({
      id: `search-${item.id}`,
      module: "services" as const,
      entityId: item.id,
      entitySlug: item.slug,
      title: item.title,
      summary: item.summary,
      bodyText: item.body ?? "",
      categorySlug: item.categorySlug,
      citySlug: item.citySlug,
      authorType: item.authorType,
      featured: Boolean(item.featured),
      publishedAt: item.publishedAt,
    })),
    ...events.filter(isPublishedPublic).map((item) => ({
      id: `search-${item.id}`,
      module: "events" as const,
      entityId: item.id,
      entitySlug: item.slug,
      title: item.title,
      summary: item.summary,
      bodyText: item.body ?? "",
      categorySlug: item.categorySlug,
      citySlug: item.citySlug,
      authorType: item.authorType,
      featured: Boolean(item.featured),
      publishedAt: item.publishedAt,
    })),
    ...guides.filter(isPublishedPublic).map((item) => ({
      id: `search-${item.id}`,
      module: "guides" as const,
      entityId: item.id,
      entitySlug: item.slug,
      title: item.title,
      summary: item.summary,
      bodyText: item.body ?? "",
      categorySlug: item.categorySlug,
      citySlug: item.citySlug,
      authorType: item.authorType,
      featured: Boolean(item.featured),
      publishedAt: item.publishedAt,
    })),
    ...resources.filter(isPublishedPublic).map((item) => ({
      id: `search-${item.id}`,
      module: "resources" as const,
      entityId: item.id,
      entitySlug: item.slug,
      title: item.title,
      summary: item.summary,
      bodyText: item.body ?? "",
      categorySlug: item.categorySlug,
      citySlug: item.citySlug,
      authorType: item.authorType,
      featured: Boolean(item.featured),
      publishedAt: item.publishedAt,
    })),
  ];
}

export class MockContentRepository implements ContentRepository {
  async listCities() {
    return cities;
  }

  async getCity(slug: string) {
    return cities.find((city) => city.slug === slug) ?? null;
  }

  async listCategories(module?: string) {
    return module ? categories.filter((category) => category.module === module) : categories;
  }

  async listCategorySchemas() {
    return categorySchemas;
  }

  async listListings(filters?: ListingFilters) {
    return listings.filter((item) => {
      if (!isPublishedPublic(item)) return false;
      if (filters?.citySlug && item.citySlug !== filters.citySlug) return false;
      if (filters?.categorySlug && item.categorySlug !== filters.categorySlug) return false;
      if (filters?.featuredOnly && !item.featured) return false;
      if (filters?.query) {
        const haystack = `${item.title} ${item.summary} ${item.body ?? ""} ${item.tags.join(" ")}`.toLowerCase();
        if (!haystack.includes(filters.query.toLowerCase())) return false;
      }
      return true;
    });
  }

  async getListing(citySlug: string, slug: string) {
    return listings.find((item) => item.citySlug === citySlug && item.slug === slug && isPublishedPublic(item)) ?? null;
  }

  async listRealEstate(citySlug?: string) {
    return realEstateRecords.filter((item) => isPublishedPublic(item) && (!citySlug || item.citySlug === citySlug));
  }

  async getRealEstate(citySlug: string, slug: string) {
    return realEstateRecords.find((item) => item.citySlug === citySlug && item.slug === slug && isPublishedPublic(item)) ?? null;
  }

  async listServices(citySlug?: string) {
    return services.filter((item) => isPublishedPublic(item) && (!citySlug || item.citySlug === citySlug));
  }

  async getService(citySlug: string, slug: string) {
    return services.find((item) => item.citySlug === citySlug && item.slug === slug && isPublishedPublic(item)) ?? null;
  }

  async listEvents(citySlug?: string) {
    return events.filter((item) => isPublishedPublic(item) && (!citySlug || item.citySlug === citySlug));
  }

  async getEvent(citySlug: string, slug: string) {
    return events.find((item) => item.citySlug === citySlug && item.slug === slug && isPublishedPublic(item)) ?? null;
  }

  async listGuides(citySlug?: string) {
    return guides.filter((item) => isPublishedPublic(item) && (!citySlug || item.citySlug === citySlug));
  }

  async getGuide(citySlug: string, slug: string) {
    return guides.find((item) => item.citySlug === citySlug && item.slug === slug && isPublishedPublic(item)) ?? null;
  }

  async getBusinessProfile(slug: string) {
    return businessProfiles.find((item) => item.slug === slug && isPublishedPublic(item)) ?? null;
  }

  async search(filters: SearchFilters) {
    return toSearchIndex().filter((item) => {
      if (filters.citySlug && item.citySlug !== filters.citySlug) return false;
      if (filters.module && item.module !== filters.module) return false;
      if (filters.categorySlug && item.categorySlug !== filters.categorySlug) return false;
      if (filters.authorType && item.authorType !== filters.authorType) return false;
      if (filters.featuredOnly && !item.featured) return false;
      if (filters.business === "business" && item.authorType !== "business") return false;
      if (filters.business === "private" && item.authorType !== "private_person") return false;
      if (filters.query) {
        const haystack = `${item.title} ${item.summary} ${item.bodyText} ${item.categorySlug} ${item.citySlug}`.toLowerCase();
        if (!haystack.includes(filters.query.toLowerCase())) return false;
      }
      return true;
    });
  }

  async createSubmission(input: CreateSubmissionInput) {
    return {
      ...input,
      id: `submission-${Math.random().toString(36).slice(2, 10)}`,
      status: input.status ?? "pending_review",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async listSubmissions() {
    return submissions;
  }

  async getModerationStatus(entityTable: string, entityId: string): Promise<ContentStatus | null> {
    if (entityTable === "submissions") {
      return submissions.find((item) => item.id === entityId)?.status ?? null;
    }

    if (entityTable === "listings") {
      return listings.find((item) => item.id === entityId)?.status ?? null;
    }

    if (entityTable === "services") {
      return services.find((item) => item.id === entityId)?.status ?? null;
    }

    if (entityTable === "real_estate") {
      return realEstateRecords.find((item) => item.id === entityId)?.status ?? null;
    }

    if (entityTable === "events") {
      return events.find((item) => item.id === entityId)?.status ?? null;
    }

    if (entityTable === "guides") {
      return guides.find((item) => item.id === entityId)?.status ?? null;
    }

    if (entityTable === "business_profiles") {
      return businessProfiles.find((item) => item.id === entityId)?.status ?? null;
    }

    return null;
  }

  async transitionModeration(input: ModerationTransitionInput) {
    return input;
  }

  async listReports() {
    return reports;
  }

  async getAdminSummary(): Promise<AdminSummary> {
    return {
      pendingSubmissions: submissions.filter((item) => item.status === "pending_review").length,
      openReports: reports.filter((item) => item.status === "open").length,
      publishedListings: listings.filter(isPublishedPublic).length,
      publishedRealEstate: realEstateRecords.filter(isPublishedPublic).length,
      publishedServices: services.filter(isPublishedPublic).length,
      upcomingEvents: events.filter(isPublishedPublic).length,
      publishedGuides: guides.filter(isPublishedPublic).length,
    };
  }
}
