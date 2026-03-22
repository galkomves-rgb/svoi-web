"use server";

import { cookies } from "next/headers";
import { ADMIN_ACCESS_COOKIE, isAdminAccessAllowed } from "@/lib/admin-access";

export async function assertAdminAccess() {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;

  if (!isAdminAccessAllowed(accessCookie)) {
    throw new Error("Admin access denied.");
  }
}
