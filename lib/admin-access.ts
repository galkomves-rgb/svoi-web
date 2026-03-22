export const ADMIN_ACCESS_COOKIE = "uahub_admin_access";

export function getAdminAccessToken() {
  return process.env.ADMIN_ACCESS_TOKEN?.trim() ?? "";
}

export function isAdminGuardBypassed() {
  return process.env.NODE_ENV !== "production" && !getAdminAccessToken();
}

export function isAdminAccessAllowed(cookieValue?: string | null) {
  if (isAdminGuardBypassed()) {
    return true;
  }

  const token = getAdminAccessToken();

  if (!token) {
    return false;
  }

  return cookieValue === token;
}
