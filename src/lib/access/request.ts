export const SECURE_SESSION_COOKIE = "__Host-portfolio-access";
export const LOCAL_SESSION_COOKIE = "portfolio-access";

type RequestDetails = Pick<Request, "headers" | "url">;

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim();
}

export function getPublicOrigin(request: RequestDetails) {
  const requestUrl = new URL(request.url);
  const forwardedProtocol = firstHeaderValue(
    request.headers.get("x-forwarded-proto"),
  )?.toLowerCase();
  const protocol =
    forwardedProtocol === "http" || forwardedProtocol === "https"
      ? forwardedProtocol
      : requestUrl.protocol.slice(0, -1);
  const host =
    firstHeaderValue(request.headers.get("x-forwarded-host")) ??
    firstHeaderValue(request.headers.get("host")) ??
    requestUrl.host;

  try {
    return new URL(`${protocol}://${host}`).origin;
  } catch {
    return requestUrl.origin;
  }
}

export function isSameOriginRequest(request: RequestDetails) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === getPublicOrigin(request);
  } catch {
    return false;
  }
}

export function isSecureRequest(request: RequestDetails) {
  const forwardedProtocol = firstHeaderValue(
    request.headers.get("x-forwarded-proto"),
  )?.toLowerCase();
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
