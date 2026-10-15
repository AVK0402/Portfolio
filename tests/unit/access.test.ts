import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { getActiveGrants, readAccessConfig } from "@/lib/access/config";
import { findMatchingGrant } from "@/lib/access/password";
import {
  getPublicOrigin,
  isSameOriginRequest,
  sanitizeReturnTo,
} from "@/lib/access/request";
import { issueSession, verifySession } from "@/lib/access/session";
import { proxy } from "@/proxy";

const TEST_PASSWORD = "Portfolio-Test-Access-Only";
const TEST_SECRET = "BwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwc";
const TEST_GRANTS = JSON.stringify([
  {
    id: "interview-test",
    label: "Interview test",
    salt: "ABEiM0RVZneImaq7zN3u_w",
    hash: "vL7q5OQdAYLZh7dVDV3L4tUlO5bZi1qHLvp9BlCqCm48UO1zNCLHt28J1vC4nRVgcBeQXVZDm-mtLqgsz1e12w",
    notBefore: "2026-01-01T00:00:00.000Z",
    expiresAt: "2027-01-01T00:00:00.000Z",
  },
]);
const NOW = Date.parse("2026-10-15T12:00:00.000Z");

function readyConfig() {
  const result = readAccessConfig({
    PORTFOLIO_ACCESS_GRANTS: TEST_GRANTS,
    PORTFOLIO_SESSION_SECRET: TEST_SECRET,
  });
  if (result.status !== "ready") throw new Error("Expected ready access config");
  return result.config;
}

afterEach(() => vi.unstubAllEnvs());

describe("portfolio access configuration", () => {
  it("fails closed when secrets are missing or malformed", () => {
    expect(readAccessConfig({}).status).toBe("unconfigured");
    expect(
      readAccessConfig({
        PORTFOLIO_ACCESS_GRANTS: TEST_GRANTS,
        PORTFOLIO_SESSION_SECRET: "too-short",
      }).status,
    ).toBe("unconfigured");
  });

  it("selects only invitations inside their access window", () => {
    const config = readyConfig();
    expect(getActiveGrants(config, NOW)).toHaveLength(1);
    expect(getActiveGrants(config, Date.parse("2028-01-01T00:00:00Z"))).toHaveLength(0);
  });

  it("matches the generated password hash without storing the password", async () => {
    const grants = getActiveGrants(readyConfig(), NOW);
    await expect(findMatchingGrant(TEST_PASSWORD, grants)).resolves.toMatchObject({
      id: "interview-test",
    });
    await expect(findMatchingGrant("incorrect", grants)).resolves.toBeNull();
  });
});

describe("portfolio sessions", () => {
  it("accepts a valid signed session and caps it to twelve hours", () => {
    const config = readyConfig();
    const grant = config.grants[0]!;
    const session = issueSession(grant, config, NOW);

    expect(session.expiresAt).toBe(NOW + 12 * 60 * 60 * 1000);
    expect(verifySession(session.token, config, NOW + 1)).toMatchObject({
      grantId: grant.id,
    });
  });

  it("rejects tampering, expiry, individual revocation and version revocation", () => {
    const config = readyConfig();
    const session = issueSession(config.grants[0]!, config, NOW);

    expect(verifySession(`${session.token}x`, config, NOW)).toBeNull();
    expect(verifySession(session.token, config, session.expiresAt)).toBeNull();
    expect(verifySession(session.token, { ...config, grants: [] }, NOW)).toBeNull();
    expect(
      verifySession(session.token, { ...config, sessionVersion: "2" }, NOW),
    ).toBeNull();
  });
});

describe("portfolio access boundary", () => {
  it("sanitizes return destinations", () => {
    expect(sanitizeReturnTo("/work?chapter=1#proof")).toBe("/work?chapter=1#proof");
    expect(sanitizeReturnTo("https://attacker.example")).toBe("/");
    expect(sanitizeReturnTo("//attacker.example")).toBe("/");
    expect(sanitizeReturnTo("/access")).toBe("/");
  });

  it("uses trusted proxy headers for same-origin checks and redirects", () => {
    const request = new Request("http://internal:3000/api/access/login", {
      headers: {
        host: "internal:3000",
        origin: "https://anish789.netlify.app",
        "x-forwarded-host": "anish789.netlify.app",
        "x-forwarded-proto": "https",
      },
    });

    expect(getPublicOrigin(request)).toBe("https://anish789.netlify.app");
    expect(isSameOriginRequest(request)).toBe(true);
    expect(
      isSameOriginRequest(
        new Request(request.url, {
          headers: {
            ...Object.fromEntries(request.headers),
            origin: "https://attacker.example",
          },
        }),
      ),
    ).toBe(false);
  });

  it("redirects anonymous pages, leaves the access route public, and accepts a session", () => {
    vi.stubEnv("PORTFOLIO_ACCESS_GRANTS", TEST_GRANTS);
    vi.stubEnv("PORTFOLIO_SESSION_SECRET", TEST_SECRET);

    const anonymous = proxy(new NextRequest("http://localhost:3000/work"));
    expect(anonymous.status).toBe(307);
    expect(anonymous.headers.get("location")).toContain("/access?returnTo=%2Fwork");

    const publicPage = proxy(new NextRequest("http://localhost:3000/access"));
    expect(publicPage.status).toBe(200);

    const config = readyConfig();
    const session = issueSession(config.grants[0]!, config, Date.now());
    const authenticated = proxy(
      new NextRequest("http://localhost:3000/work", {
        headers: { cookie: `portfolio-access=${session.token}` },
      }),
    );
    expect(authenticated.status).toBe(200);
  });
});
