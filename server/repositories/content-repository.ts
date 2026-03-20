import type {
  BusinessProfile,
  CategoryDefinition,
  CategorySchemaDefinition,
  City,
  ContentStatus,
  EventRecord,
  GuideRecord,
  ListingRecord,
  ReportRecord,
  SearchIndexRecord,
  ServiceRecord,
  SubmissionRecord,
} from "@/types/domain";

export type ListingFilters = {
  citySlug?: string;
  categorySlug?: string;
  query?: string;
  featuredOnly?: boolean;
};

export type SearchFilters = {
  query?: string;
  citySlug?: string;
  module?: string;
  categorySlug?: string;
  authorType?: string;
  business?: "all" | "business" | "private";
  featuredOnly?: boolean;
};

export type AdminSummary = {
  pendingSubmissions: number;
  openReports: number;
  publishedListings: number;
  publishedServices: number;
  upcomingEvents: number;
  publishedGuides: number;
};

export type ModerationTransitionInput = {
  entityTable: string;
  entityId: string;
  nextStatus: SubmissionRecord["status"] | ListingRecord["status"];
  note?: string;
};

export type CreateSubmissionInput = Omit<SubmissionRecord, "id" | "createdAt" | "updatedAt" | "status"> & {
  status?: SubmissionRecord["status"];
};

export interface ContentRepository {
  listCities(): Promise<City[]>;
  getCity(slug: string): Promise<City | null>;
  listCategories(module?: string): Promise<CategoryDefinition[]>;
  listCategorySchemas(): Promise<CategorySchemaDefinition[]>;
  listListings(filters?: ListingFilters): Promise<ListingRecord[]>;
  getListing(citySlug: string, slug: string): Promise<ListingRecord | null>;
  listServices(citySlug?: string): Promise<ServiceRecord[]>;
  getService(citySlug: string, slug: string): Promise<ServiceRecord | null>;
  listEvents(citySlug?: string): Promise<EventRecord[]>;
  getEvent(citySlug: string, slug: string): Promise<EventRecord | null>;
  listGuides(citySlug?: string): Promise<GuideRecord[]>;
  getGuide(citySlug: string, slug: string): Promise<GuideRecord | null>;
  getBusinessProfile(slug: string): Promise<BusinessProfile | null>;
  search(filters: SearchFilters): Promise<SearchIndexRecord[]>;
  createSubmission(input: CreateSubmissionInput): Promise<SubmissionRecord>;
  listSubmissions(): Promise<SubmissionRecord[]>;
  getModerationStatus(entityTable: string, entityId: string): Promise<ContentStatus | null>;
  transitionModeration(input: ModerationTransitionInput): Promise<ModerationTransitionInput>;
  listReports(): Promise<ReportRecord[]>;
  getAdminSummary(): Promise<AdminSummary>;
}
