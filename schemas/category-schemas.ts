import { z } from "zod";
import { categorySchemas } from "@/data/categories";
import { baseSubmissionSchema } from "./content";

const fieldSchemaMap = {
  salary_range: z.string().max(80).optional(),
  employment_type: z.enum(["full-time", "part-time", "project"]).optional(),
  budget_eur: z.string().max(60).optional(),
  rooms: z.coerce.number().int().min(0).max(20).optional(),
  urgency_note: z.string().max(140).optional(),
  price_label: z.string().max(80).optional(),
  contact_goal: z.string().max(120).optional(),
  contact_label: z.string().min(3).max(80).optional(),
  website_url: z.string().url().optional().or(z.literal("")),
  starts_at: z.string().min(10).optional(),
  ends_at: z.string().min(10).optional(),
} as const;

export const schemaDefinitions = categorySchemas;

export function getCategorySchemaDefinition(schemaKey: string) {
  return schemaDefinitions.find((schema) => schema.key === schemaKey);
}

export function buildSubmissionSchema(schemaKey: string) {
  const definition = getCategorySchemaDefinition(schemaKey);

  if (!definition) {
    return baseSubmissionSchema;
  }

  const dynamicShape = Object.fromEntries(
    definition.fields.map((field) => [field.key, fieldSchemaMap[field.key as keyof typeof fieldSchemaMap] ?? z.string().optional()]),
  );

  return baseSubmissionSchema.extend(dynamicShape);
}

export const listingSubmissionSchema = buildSubmissionSchema("listing-job");
export const serviceSubmissionSchema = buildSubmissionSchema("service-standard");
export const eventSubmissionSchema = buildSubmissionSchema("event-standard");

export type GenericSubmissionInput = z.infer<typeof baseSubmissionSchema> & Record<string, unknown>;
