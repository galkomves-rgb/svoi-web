import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_ACCESS_COOKIE, isAdminAccessAllowed } from "@/lib/admin-access";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const accessCookie = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;

  if (isAdminAccessAllowed(accessCookie)) {
    return NextResponse.next();
  }

  const accessUrl = new URL("/admin-access", request.url);
  accessUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(accessUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
