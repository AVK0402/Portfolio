import { createHmac, timingSafeEqual } from "node:crypto";
import type { AccessConfig, AccessGrant } from "./config";

type SessionPayload = {
  grantId: string;
  version: string;
  issuedAt: number;
  expiresAt: number;
};

function sign(encodedPayload: string, secret: Buffer) {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

function signaturesMatch(expected: string, received: string) {
  const left = Buffer.from(expected);
  const right = Buffer.from(received);
  return left.byteLength === right.byteLength && timingSafeEqual(left, right);
}

export function issueSession(
  grant: AccessGrant,
  config: AccessConfig,
  now = Date.now(),
) {
  const payload: SessionPayload = {
    grantId: grant.id,
    version: config.sessionVersion,
    issuedAt: now,
    expiresAt: Math.min(now + config.sessionDurationMs, grant.expiresAt),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return {
    token: `${encodedPayload}.${sign(encodedPayload, config.sessionSecret)}`,
    expiresAt: payload.expiresAt,
  };
}

export function verifySession(
  token: string | undefined,
  config: AccessConfig,
  now = Date.now(),
) {
  if (!token) return null;
  const [encodedPayload, receivedSignature, extra] = token.split(".");
  if (!encodedPayload || !receivedSignature || extra) return null;

  const expectedSignature = sign(encodedPayload, config.sessionSecret);
  if (!signaturesMatch(expectedSignature, receivedSignature)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;
    if (
      typeof payload.grantId !== "string" ||
      typeof payload.version !== "string" ||
      !Number.isInteger(payload.issuedAt) ||
      !Number.isInteger(payload.expiresAt) ||
      payload.version !== config.sessionVersion ||
      payload.issuedAt! > now ||
      payload.expiresAt! <= now ||
      payload.expiresAt! <= payload.issuedAt! ||
      payload.expiresAt! > payload.issuedAt! + config.sessionDurationMs
    ) {
      return null;
    }

    const grant = config.grants.find(({ id }) => id === payload.grantId);
    if (
      !grant ||
      payload.issuedAt! < grant.notBefore ||
      now < grant.notBefore ||
      now >= grant.expiresAt ||
      payload.expiresAt! > grant.expiresAt
    ) {
      return null;
    }

    return payload as SessionPayload;
  } catch {
    return null;
  }
}
