import { NextResponse } from "next/server";
import { getActiveGrants, readAccessConfig } from "@/lib/access/config";
import { findMatchingGrant } from "@/lib/access/password";
import {
  getSessionCookieName,
  isSecureRequest,
  sanitizeReturnTo,
} from "@/lib/access/request";
import { issueSession } from "@/lib/access/session";

function accessRedirect(request: Request, returnTo: string, error?: string) {
  const url = new URL("/access", request.url);
  if (returnTo !== "/") url.searchParams.set("returnTo", returnTo);
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return new Response("Forbidden", { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return accessRedirect(request, "/", "invalid");
  }

  const password = formData.get("password");
  const returnTo = sanitizeReturnTo(formData.get("returnTo"));
  if (typeof password !== "string" || password.length < 1 || password.length > 256) {
    return accessRedirect(request, returnTo, "invalid");
  }

  const configResult = readAccessConfig();
  if (configResult.status !== "ready") return accessRedirect(request, returnTo);

  const now = Date.now();
  const grant = await findMatchingGrant(
    password,
    getActiveGrants(configResult.config, now),
  );
  if (!grant) return accessRedirect(request, returnTo, "invalid");

  const session = issueSession(grant, configResult.config, now);
  const response = NextResponse.redirect(new URL(returnTo, request.url), 303);
  const secure = isSecureRequest(request);
  response.cookies.set(getSessionCookieName(request), session.token, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    expires: new Date(session.expiresAt),
    path: "/",
    priority: "high",
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
