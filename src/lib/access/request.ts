export const SECURE_SESSION_COOKIE = "__Host-portfolio-access";
export const LOCAL_SESSION_COOKIE = "portfolio-access";

type RequestDetails = Pick<Request, "headers" | "url">;

export function isSecureRequest(request: RequestDetails) {
  const forwardedProtocol = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim()
    .toLowerCase();
  return forwardedProtocol
    ? forwardedProtocol === "https"
    : new URL(request.url).protocol === "https:";
}

export function getSessionCookieName(request: RequestDetails) {
  return isSecureRequest(request) ? SECURE_SESSION_COOKIE : LOCAL_SESSION_COOKIE;
}

export function sanitizeReturnTo(value: unknown) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001F]/.test(value)
  ) {
    return "/";
  }

  try {
    const url = new URL(value, "https://portfolio.invalid");
    if (
      url.origin !== "https://portfolio.invalid" ||
      url.pathname === "/access" ||
      url.pathname.startsWith("/api/access/")
    ) {
      return "/";
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}
