import { NextResponse } from "next/server";
import { LOCAL_SESSION_COOKIE, SECURE_SESSION_COOKIE } from "@/lib/access/request";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return new Response("Forbidden", { status: 403 });
  }

  const response = NextResponse.redirect(new URL("/access", request.url), 303);
  response.cookies.set(LOCAL_SESSION_COOKIE, "", { expires: new Date(0), path: "/" });
  response.cookies.set(SECURE_SESSION_COOKIE, "", {
    expires: new Date(0),
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
