import { z } from "zod";

export const geoScopeTypeSchema = z.enum(["country", "region", "city", "district"]);
export const contentStatusSchema = z.enum([
  "draft",
  "pending_review",
  "changes_requested",
  "approved",
  "published",
  "rejected",
  "archived",
  "expired",
]);
export const visibilitySchema = z.enum(["public", "unlisted", "private", "hidden_by_moderation"]);
export const authorTypeSchema = z.enum(["private_person", "business", "community_org", "editorial", "official"]);

export const baseSubmissionSchema = z.object({
  title: z.string().min(8).max(140),
  summary: z.string().min(12).max(300),
  body: z.string().max(5000).optional().default(""),
  categorySlug: z.string().min(2),
  authorType: authorTypeSchema,
  businessProfileSlug: z.string().optional().nullable(),
  countrySlug: z.string().min(2),
  regionSlug: z.string().min(2),
  citySlug: z.string().min(2),
  districtSlug: z.string().optional().nullable(),
  geoScopeType: geoScopeTypeSchema,
  addressText: z.string().max(180).optional().nullable(),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
  googlePlaceId: z.string().optional().nullable(),
});

export const searchParamsSchema = z.object({
  q: z.string().optional().default(""),
  city: z.string().optional(),
  module: z.string().optional(),
  category: z.string().optional(),
  authorType: z.string().optional(),
  business: z.enum(["all", "business", "private"]).optional().default("all"),
  featured: z.enum(["all", "featured"]).optional().default("all"),
});
