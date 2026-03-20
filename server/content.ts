import { hasSupabaseEnv } from "@/server/supabase/env";
import { MockContentRepository } from "./repositories/mock-content-repository";
import { SupabaseContentRepository } from "./repositories/supabase-content-repository";

export function getContentRepository() {
  return hasSupabaseEnv() ? new SupabaseContentRepository() : new MockContentRepository();
}
