"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_ACCESS_COOKIE, getAdminAccessToken, isAdminGuardBypassed } from "@/lib/admin-access";

export async function unlockAdminAccess(formData: FormData) {
  const nextPath = String(formData.get("next") || "/admin");
  const submittedToken = String(formData.get("token") || "").trim();

  if (isAdminGuardBypassed()) {
    redirect(nextPath.startsWith("/") ? nextPath : "/admin");
  }

  const expectedToken = getAdminAccessToken();

  if (!expectedToken || submittedToken !== expectedToken) {
    redirect(`/admin-access?error=1&next=${encodeURIComponent(nextPath)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_ACCESS_COOKIE, submittedToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(nextPath.startsWith("/") ? nextPath : "/admin");
}
