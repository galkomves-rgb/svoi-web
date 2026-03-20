export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue | undefined }
  | JsonValue[];

export type Database = {
  public: {
    Tables: {
      geography_countries: {
        Row: { id: string; slug: string; code: string; name: string; created_at: string };
        Insert: { id?: string; slug: string; code: string; name: string; created_at?: string };
        Update: Partial<{ id: string; slug: string; code: string; name: string; created_at: string }>;
      };
      geography_regions: {
        Row: { id: string; country_id: string; slug: string; name: string; created_at: string };
        Insert: { id?: string; country_id: string; slug: string; name: string; created_at?: string };
        Update: Partial<{ id: string; country_id: string; slug: string; name: string; created_at: string }>;
      };
      geography_cities: {
        Row: { id: string; region_id: string; slug: string; name: string; hero_title: string | null; hero_lead: string | null; created_at: string };
        Insert: { id?: string; region_id: string; slug: string; name: string; hero_title?: string | null; hero_lead?: string | null; created_at?: string };
        Update: Partial<{ id: string; region_id: string; slug: string; name: string; hero_title: string | null; hero_lead: string | null; created_at: string }>;
      };
      business_profiles: {
        Row: { id: string; slug: string; name: string; summary: string; description: string; status: string; visibility: string; category_slug: string; city_id: string; region_id: string; country_id: string; district_id: string | null; is_verified: boolean; website_url: string | null; contact_label: string; address_text: string | null; latitude: number | null; longitude: number | null; google_place_id: string | null; created_at: string; updated_at: string };
        Insert: { id?: string; slug: string; name: string; summary: string; description: string; status?: string; visibility?: string; category_slug: string; city_id: string; region_id: string; country_id: string; district_id?: string | null; is_verified?: boolean; website_url?: string | null; contact_label: string; address_text?: string | null; latitude?: number | null; longitude?: number | null; google_place_id?: string | null; created_at?: string; updated_at?: string };
        Update: Partial<{ id: string; slug: string; name: string; summary: string; description: string; status: string; visibility: string; category_slug: string; city_id: string; region_id: string; country_id: string; district_id: string | null; is_verified: boolean; website_url: string | null; contact_label: string; address_text: string | null; latitude: number | null; longitude: number | null; google_place_id: string | null; created_at: string; updated_at: string }>;
      };
      categories: {
        Row: { id: string; module_key: string; slug: string; label: string; schema_key: string; parent_slug: string | null; created_at: string };
        Insert: { id?: string; module_key: string; slug: string; label: string; schema_key: string; parent_slug?: string | null; created_at?: string };
        Update: Partial<{ id: string; module_key: string; slug: string; label: string; schema_key: string; parent_slug: string | null; created_at: string }>;
      };
      category_schemas: {
        Row: { id: string; schema_key: string; module_key: string; title: string; fields_json: JsonValue; created_at: string };
        Insert: { id?: string; schema_key: string; module_key: string; title: string; fields_json: JsonValue; created_at?: string };
        Update: Partial<{ id: string; schema_key: string; module_key: string; title: string; fields_json: JsonValue; created_at: string }>;
      };
      listings: {
        Row: { id: string; slug: string; title: string; summary: string; body: string | null; category_slug: string; status: string; visibility: string; author_type: string; is_verified: boolean; featured: boolean; business_profile_id: string | null; owner_profile_id: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; address_text: string | null; latitude: number | null; longitude: number | null; google_place_id: string | null; price_label: string | null; tags: string[] | null; published_at: string | null; expires_at: string | null; created_at: string; updated_at: string };
        Insert: { id?: string; slug: string; title: string; summary: string; body?: string | null; category_slug: string; status?: string; visibility?: string; author_type: string; is_verified?: boolean; featured?: boolean; business_profile_id?: string | null; owner_profile_id?: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id?: string | null; address_text?: string | null; latitude?: number | null; longitude?: number | null; google_place_id?: string | null; price_label?: string | null; tags?: string[] | null; published_at?: string | null; expires_at?: string | null; created_at?: string; updated_at?: string };
        Update: Partial<{ id: string; slug: string; title: string; summary: string; body: string | null; category_slug: string; status: string; visibility: string; author_type: string; is_verified: boolean; featured: boolean; business_profile_id: string | null; owner_profile_id: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; address_text: string | null; latitude: number | null; longitude: number | null; google_place_id: string | null; price_label: string | null; tags: string[] | null; published_at: string | null; expires_at: string | null; created_at: string; updated_at: string }>;
      };
      services: {
        Row: { id: string; slug: string; title: string; summary: string; body: string | null; category_slug: string; status: string; visibility: string; author_type: string; is_verified: boolean; featured: boolean; business_profile_id: string | null; owner_profile_id: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; address_text: string | null; latitude: number | null; longitude: number | null; google_place_id: string | null; contact_label: string; tags: string[] | null; published_at: string | null; expires_at: string | null; created_at: string; updated_at: string };
        Insert: { id?: string; slug: string; title: string; summary: string; body?: string | null; category_slug: string; status?: string; visibility?: string; author_type: string; is_verified?: boolean; featured?: boolean; business_profile_id?: string | null; owner_profile_id?: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id?: string | null; address_text?: string | null; latitude?: number | null; longitude?: number | null; google_place_id?: string | null; contact_label: string; tags?: string[] | null; published_at?: string | null; expires_at?: string | null; created_at?: string; updated_at?: string };
        Update: Partial<{ id: string; slug: string; title: string; summary: string; body: string | null; category_slug: string; status: string; visibility: string; author_type: string; is_verified: boolean; featured: boolean; business_profile_id: string | null; owner_profile_id: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; address_text: string | null; latitude: number | null; longitude: number | null; google_place_id: string | null; contact_label: string; tags: string[] | null; published_at: string | null; expires_at: string | null; created_at: string; updated_at: string }>;
      };
      events: {
        Row: { id: string; slug: string; title: string; summary: string; body: string | null; category_slug: string; status: string; visibility: string; author_type: string; is_verified: boolean; featured: boolean; business_profile_id: string | null; owner_profile_id: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; address_text: string | null; latitude: number | null; longitude: number | null; google_place_id: string | null; starts_at: string; ends_at: string | null; published_at: string | null; expires_at: string | null; created_at: string; updated_at: string };
        Insert: { id?: string; slug: string; title: string; summary: string; body?: string | null; category_slug: string; status?: string; visibility?: string; author_type: string; is_verified?: boolean; featured?: boolean; business_profile_id?: string | null; owner_profile_id?: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id?: string | null; address_text?: string | null; latitude?: number | null; longitude?: number | null; google_place_id?: string | null; starts_at: string; ends_at?: string | null; published_at?: string | null; expires_at?: string | null; created_at?: string; updated_at?: string };
        Update: Partial<{ id: string; slug: string; title: string; summary: string; body: string | null; category_slug: string; status: string; visibility: string; author_type: string; is_verified: boolean; featured: boolean; business_profile_id: string | null; owner_profile_id: string | null; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; address_text: string | null; latitude: number | null; longitude: number | null; google_place_id: string | null; starts_at: string; ends_at: string | null; published_at: string | null; expires_at: string | null; created_at: string; updated_at: string }>;
      };
      guides: {
        Row: { id: string; slug: string; title: string; summary: string; body: string | null; category_slug: string; status: string; visibility: string; author_type: string; is_verified: boolean; featured: boolean; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; steps: string[] | null; published_at: string | null; created_at: string; updated_at: string };
        Insert: { id?: string; slug: string; title: string; summary: string; body?: string | null; category_slug: string; status?: string; visibility?: string; author_type: string; is_verified?: boolean; featured?: boolean; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id?: string | null; steps?: string[] | null; published_at?: string | null; created_at?: string; updated_at?: string };
        Update: Partial<{ id: string; slug: string; title: string; summary: string; body: string | null; category_slug: string; status: string; visibility: string; author_type: string; is_verified: boolean; featured: boolean; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; steps: string[] | null; published_at: string | null; created_at: string; updated_at: string }>;
      };
      submissions: {
        Row: { id: string; module_key: string; category_slug: string; title: string; summary: string; body: string | null; author_type: string; business_profile_id: string | null; payload: JsonValue; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; status: string; created_by: string | null; created_at: string; updated_at: string };
        Insert: { id?: string; module_key: string; category_slug: string; title: string; summary: string; body?: string | null; author_type: string; business_profile_id?: string | null; payload: JsonValue; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id?: string | null; status?: string; created_by?: string | null; created_at?: string; updated_at?: string };
        Update: Partial<{ id: string; module_key: string; category_slug: string; title: string; summary: string; body: string | null; author_type: string; business_profile_id: string | null; payload: JsonValue; geo_scope_type: string; country_id: string; region_id: string; city_id: string; district_id: string | null; status: string; created_by: string | null; created_at: string; updated_at: string }>;
      };
      moderation_logs: {
        Row: { id: string; entity_table: string; entity_id: string; action: string; previous_status: string | null; next_status: string; note: string | null; created_by: string | null; created_at: string };
        Insert: { id?: string; entity_table: string; entity_id: string; action: string; previous_status?: string | null; next_status: string; note?: string | null; created_by?: string | null; created_at?: string };
        Update: Partial<{ id: string; entity_table: string; entity_id: string; action: string; previous_status: string | null; next_status: string; note: string | null; created_by: string | null; created_at: string }>;
      };
      reports: {
        Row: { id: string; entity_table: string; entity_id: string; reason: string; status: string; created_by: string | null; created_at: string };
        Insert: { id?: string; entity_table: string; entity_id: string; reason: string; status?: string; created_by?: string | null; created_at?: string };
        Update: Partial<{ id: string; entity_table: string; entity_id: string; reason: string; status: string; created_by: string | null; created_at: string }>;
      };
      search_index: {
        Row: { id: string; module_key: string; entity_table: string; entity_id: string; entity_slug: string; title: string; summary: string; body_text: string; category_slug: string; city_slug: string; author_type: string; is_business: boolean; featured: boolean; published_at: string | null; document: unknown };
        Insert: { id?: string; module_key: string; entity_table: string; entity_id: string; entity_slug: string; title: string; summary: string; body_text: string; category_slug: string; city_slug: string; author_type: string; is_business?: boolean; featured?: boolean; published_at?: string | null; document?: unknown };
        Update: Partial<{ id: string; module_key: string; entity_table: string; entity_id: string; entity_slug: string; title: string; summary: string; body_text: string; category_slug: string; city_slug: string; author_type: string; is_business: boolean; featured: boolean; published_at: string | null; document: unknown }>;
      };
    };
  };
};
