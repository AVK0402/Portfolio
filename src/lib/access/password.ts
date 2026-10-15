import { scrypt, timingSafeEqual } from "node:crypto";
import type { AccessGrant } from "./config";

const HASH_BYTES = 64;

function derivePassword(password: string, salt: string) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(password, Buffer.from(salt, "base64url"), HASH_BYTES, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function findMatchingGrant(password: string, grants: AccessGrant[]) {
  let match: AccessGrant | null = null;

  // Check every active grant so response time does not identify which invitation matched.
  for (const grant of grants) {
    const candidate = await derivePassword(password, grant.salt);
    const expected = Buffer.from(grant.hash, "base64url");
    if (timingSafeEqual(candidate, expected) && match === null) match = grant;
  }

  return match;
}
