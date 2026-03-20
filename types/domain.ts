export type GeoScopeType = "country" | "region" | "city" | "district";

export type ContentStatus =
  | "draft"
  | "pending_review"
  | "changes_requested"
  | "approved"
  | "published"
  | "rejected"
  | "archived"
  | "expired";

export type Visibility =
  | "public"
  | "unlisted"
  | "private"
  | "hidden_by_moderation";

export type AuthorType =
  | "private_person"
  | "business"
  | "community_org"
  | "editorial"
  | "official";

export type ModerationAction =
  | "submitted"
  | "requested_changes"
  | "approved"
  | "published"
  | "rejected"
  | "archived";

export type ModuleKey =
  | "listings"
  | "services"
  | "events"
  | "guides"
  | "resources"
  | "start"
  | "search";

export type ListingTaxonomy =
  | "hiring"
  | "looking-for-work"
  | "rent-offer"
  | "rent-request"
  | "sale-offer"
  | "roommate-search"
  | "need-help"
  | "can-help"
  | "sell"
  | "buy"
  | "exchange"
  | "local-request"
  | "looking-for-contacts";

export type ServicesTaxonomy =
  | "legal"
  | "translation"
  | "real-estate"
  | "healthcare"
  | "beauty"
  | "education"
  | "repairs"
  | "transport"
  | "finance"
  | "psychology"
  | "childcare";

export type EventsTaxonomy =
  | "meetup"
  | "workshop"
  | "networking"
  | "volunteering"
  | "family"
  | "kids"
  | "culture"
  | "sport";

export type GuidesTaxonomy =
  | "documents"
  | "housing"
  | "healthcare"
  | "banking"
  | "education"
  | "transport"
  | "local-life";

export type GeoReference = {
  countrySlug: string;
  regionSlug: string;
  citySlug: string;
  districtSlug?: string | null;
  geoScopeType: GeoScopeType;
};

export type MapFields = {
  addressText?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  googlePlaceId?: string | null;
};

export type ModerationFields = {
  status: ContentStatus;
  visibility: Visibility;
  publishedAt?: string | null;
  expiresAt?: string | null;
  moderationNotes?: string | null;
};

export type AuthorFields = {
  authorType: AuthorType;
  isVerified: boolean;
  businessProfileSlug?: string | null;
  ownerProfileId?: string | null;
};

export type BaseEntity = GeoReference &
  MapFields &
  ModerationFields &
  AuthorFields & {
    id: string;
    slug: string;
    title: string;
    summary: string;
    body?: string;
    createdAt: string;
    updatedAt: string;
    featured?: boolean;
  };

export type Country = {
  id: string;
  slug: string;
  code: string;
  name: string;
};

export type Region = {
  id: string;
  countrySlug: string;
  slug: string;
  name: string;
};

export type City = {
  id: string;
  countrySlug: string;
  regionSlug: string;
  slug: string;
  name: string;
  heroTitle: string;
  heroLead: string;
};

export type District = {
  id: string;
  citySlug: string;
  slug: string;
  name: string;
};

export type BusinessProfile = GeoReference &
  MapFields & {
    id: string;
    slug: string;
    name: string;
    summary: string;
    description: string;
    status: ContentStatus;
    visibility: Visibility;
    isVerified: boolean;
    categorySlug: ServicesTaxonomy | "community-support";
    websiteUrl?: string | null;
    contactLabel: string;
    createdAt: string;
    updatedAt: string;
  };

export type ListingRecord = BaseEntity & {
  module: "listings";
  categorySlug: ListingTaxonomy;
  priceLabel?: string | null;
  tags: string[];
};

export type ServiceRecord = BaseEntity & {
  module: "services";
  categorySlug: ServicesTaxonomy;
  contactLabel: string;
  tags: string[];
};

export type EventRecord = BaseEntity & {
  module: "events";
  categorySlug: EventsTaxonomy;
  startsAt: string;
  endsAt?: string | null;
  ctaLabel: string;
};

export type GuideRecord = BaseEntity & {
  module: "guides";
  categorySlug: GuidesTaxonomy;
  steps: string[];
};

export type ResourceRecord = BaseEntity & {
  module: "resources";
  categorySlug: GuidesTaxonomy | "community";
  url: string;
};

export type SearchIndexRecord = {
  id: string;
  module: Exclude<ModuleKey, "start" | "search">;
  entityId: string;
  entitySlug: string;
  title: string;
  summary: string;
  bodyText: string;
  categorySlug: string;
  citySlug: string;
  authorType: AuthorType;
  featured: boolean;
  publishedAt?: string | null;
};

export type SubmissionRecord = {
  id: string;
  module: "listings" | "services" | "events";
  categorySlug: string;
  title: string;
  summary: string;
  body?: string;
  authorType: AuthorType;
  businessProfileSlug?: string | null;
  geoScopeType: GeoScopeType;
  countrySlug: string;
  regionSlug: string;
  citySlug: string;
  districtSlug?: string | null;
  payload: Record<string, unknown>;
  status: Exclude<ContentStatus, "approved" | "published" | "archived" | "expired">;
  createdAt: string;
  updatedAt: string;
};

export type ModerationLogRecord = {
  id: string;
  entityTable: string;
  entityId: string;
  action: ModerationAction;
  previousStatus?: ContentStatus | null;
  nextStatus: ContentStatus;
  note?: string | null;
  createdAt: string;
};

export type ReportRecord = {
  id: string;
  entityTable: string;
  entityId: string;
  reason: string;
  status: "open" | "reviewing" | "resolved";
  createdAt: string;
};

export type PromotionRecord = {
  id: string;
  module: "listings" | "services" | "events" | "guides";
  entityId: string;
  label: string;
  activeFrom: string;
  activeUntil: string;
};

export type CategoryDefinition = {
  id: string;
  module: "listings" | "services" | "events" | "guides";
  slug: string;
  label: string;
  schemaKey: string;
  parentSlug?: string | null;
};

export type CategorySchemaField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export type CategorySchemaDefinition = {
  key: string;
  module: "listings" | "services" | "events";
  title: string;
  fields: CategorySchemaField[];
};
