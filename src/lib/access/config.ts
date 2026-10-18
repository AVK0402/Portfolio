const MAX_GRANTS = 12;
const MIN_SECRET_BYTES = 32;
const SALT_BYTES = 16;
const HASH_BYTES = 64;
const DEFAULT_SESSION_HOURS = 12;

export type AccessGrant = {
  id: string;
  label: string;
  salt: string;
  hash: string;
  notBefore: number;
  expiresAt: number | null;
};

export type AccessConfig = {
  grants: AccessGrant[];
  sessionSecret: Buffer;
  sessionVersion: string;
  sessionDurationMs: number;
};

export type AccessConfigResult =
  { status: "ready"; config: AccessConfig } | { status: "unconfigured" };

type AccessEnvironment = {
  [key: string]: string | undefined;
  PORTFOLIO_ACCESS_GRANTS?: string;
  PORTFOLIO_SESSION_SECRET?: string;
  PORTFOLIO_ACCESS_VERSION?: string;
  PORTFOLIO_SESSION_HOURS?: string;
};

function decodeBase64Url(value: unknown, expectedBytes?: number) {
  if (typeof value !== "string" || !/^[A-Za-z0-9_-]+$/.test(value)) return null;

  try {
    const decoded = Buffer.from(value, "base64url");
    if (expectedBytes !== undefined && decoded.byteLength !== expectedBytes)
      return null;
    return decoded;
  } catch {
    return null;
  }
}

function parseGrant(value: unknown): AccessGrant | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const grant = value as Record<string, unknown>;
  const notBefore = Date.parse(String(grant.notBefore ?? ""));
  const expiresAt =
    grant.expiresAt === null ? null : Date.parse(String(grant.expiresAt ?? ""));
  const salt = typeof grant.salt === "string" ? grant.salt : "";
  const hash = typeof grant.hash === "string" ? grant.hash : "";

  if (
    typeof grant.id !== "string" ||
    !/^[a-z0-9][a-z0-9-]{2,63}$/.test(grant.id) ||
    typeof grant.label !== "string" ||
    grant.label.trim().length < 1 ||
    grant.label.length > 100 ||
    !decodeBase64Url(salt, SALT_BYTES) ||
    !decodeBase64Url(hash, HASH_BYTES) ||
    !Number.isFinite(notBefore) ||
    (expiresAt !== null && !Number.isFinite(expiresAt)) ||
    (expiresAt !== null && notBefore >= expiresAt)
  ) {
    return null;
  }

  return {
    id: grant.id,
    label: grant.label.trim(),
    salt,
    hash,
    notBefore,
    expiresAt,
  };
}

export function readAccessConfig(
  environment: AccessEnvironment = process.env,
): AccessConfigResult {
  const rawGrants = environment.PORTFOLIO_ACCESS_GRANTS;
  const rawSecret = environment.PORTFOLIO_SESSION_SECRET;
  if (!rawGrants || !rawSecret) return { status: "unconfigured" };

  try {
    const parsed = JSON.parse(rawGrants) as unknown;
    if (!Array.isArray(parsed) || parsed.length < 1 || parsed.length > MAX_GRANTS) {
      return { status: "unconfigured" };
    }

    const grants = parsed.map(parseGrant);
    if (grants.some((grant) => grant === null)) return { status: "unconfigured" };

    const validGrants = grants as AccessGrant[];
    if (new Set(validGrants.map(({ id }) => id)).size !== validGrants.length) {
      return { status: "unconfigured" };
    }

    const sessionSecret = decodeBase64Url(rawSecret);
    if (!sessionSecret || sessionSecret.byteLength < MIN_SECRET_BYTES) {
      return { status: "unconfigured" };
    }

    const sessionHours = Number(
      environment.PORTFOLIO_SESSION_HOURS ?? DEFAULT_SESSION_HOURS,
    );
    if (!Number.isInteger(sessionHours) || sessionHours < 1 || sessionHours > 24) {
      return { status: "unconfigured" };
    }

    const sessionVersion = environment.PORTFOLIO_ACCESS_VERSION ?? "1";
    if (!/^[A-Za-z0-9._-]{1,32}$/.test(sessionVersion)) {
      return { status: "unconfigured" };
    }

    return {
      status: "ready",
      config: {
        grants: validGrants,
        sessionSecret,
        sessionVersion,
        sessionDurationMs: sessionHours * 60 * 60 * 1000,
      },
    };
  } catch {
    return { status: "unconfigured" };
  }
}

export function getActiveGrants(config: AccessConfig, now = Date.now()) {
  return config.grants.filter(
    ({ notBefore, expiresAt }) =>
      now >= notBefore && (expiresAt === null || now < expiresAt),
  );
}
