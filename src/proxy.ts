import { NextResponse, type NextRequest } from "next/server";
import { readAccessConfig } from "@/lib/access/config";
import { getSessionCookieName, sanitizeReturnTo } from "@/lib/access/request";
import { verifySession } from "@/lib/access/session";

const PUBLIC_PATHS = new Set([
  "/access",
  "/api/access/login",
  "/api/access/logout",
  "/robots.txt",
  "/favicon.ico",
]);

function privateResponse(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, noarchive, nosnippet");
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicPath = PUBLIC_PATHS.has(pathname);
  const configResult = readAccessConfig();
  const token = request.cookies.get(getSessionCookieName(request))?.value;
  const session =
    configResult.status === "ready" ? verifySession(token, configResult.config) : null;

  if (pathname === "/access" && session) {
    const returnTo = sanitizeReturnTo(request.nextUrl.searchParams.get("returnTo"));
    return privateResponse(NextResponse.redirect(new URL(returnTo, request.url)));
  }

  if (isPublicPath) return privateResponse(NextResponse.next());

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return privateResponse(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      );
    }

    const accessUrl = new URL("/access", request.url);
    accessUrl.searchParams.set(
      "returnTo",
      `${pathname}${request.nextUrl.search}${request.nextUrl.hash}`,
    );
    return privateResponse(NextResponse.redirect(accessUrl));
  }

  return privateResponse(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/webpack-hmr).*)"],
};
