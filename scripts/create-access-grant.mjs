import { randomBytes, scrypt } from "node:crypto";

const HELP = `
Create a portfolio invitation

Usage:
  pnpm access:create -- --label "Company / role" --expires "2026-11-01T18:30:00+05:30"
  pnpm access:create -- --label "Portfolio access" --no-expiry

Options:
  --label     Private label used only in server configuration (required)
  --expires   ISO date/time when access ends
  --no-expiry Keep access valid until the invitation is revoked
  --starts    ISO date/time when access begins (defaults to now)
  --id        Stable lowercase invitation id (generated when omitted)
  --help      Show this help
`;

function option(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

function fail(message) {
  console.error(`\n${message}\n${HELP}`);
  process.exitCode = 1;
}

function derive(password, salt) {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

if (process.argv.includes("--help")) {
  console.log(HELP);
} else {
  const label = option("label")?.trim();
  const starts = new Date(option("starts") ?? Date.now());
  const expiresOption = option("expires");
  const noExpiry = process.argv.includes("--no-expiry");
  const expires = expiresOption ? new Date(expiresOption) : null;
  const generatedId = `${(label ?? "invitation")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 54)}-${randomBytes(4).toString("hex")}`;
  const id = option("id") ?? generatedId;

  if (!label) fail("--label is required.");
  else if (!/^[a-z0-9][a-z0-9-]{2,63}$/.test(id)) {
    fail("--id must be 3–64 lowercase letters, numbers, or hyphens.");
  } else if (Number.isNaN(starts.getTime())) fail("--starts is not a valid date/time.");
  else if (noExpiry && expiresOption) {
    fail("Use either --expires or --no-expiry, not both.");
  } else if (!noExpiry && !expires) {
    fail("Either --expires or --no-expiry is required.");
  } else if (expires && Number.isNaN(expires.getTime())) {
    fail("--expires must be a valid date/time.");
  } else if (expires && expires <= starts) {
    fail("--expires must be later than --starts.");
  } else {
    try {
      const existing = process.env.PORTFOLIO_ACCESS_GRANTS
        ? JSON.parse(process.env.PORTFOLIO_ACCESS_GRANTS)
        : [];
      if (!Array.isArray(existing))
        throw new Error("Existing grants are not an array.");
      if (existing.length >= 12)
        throw new Error("The maximum of 12 invitations is reached.");
      if (existing.some((grant) => grant?.id === id)) {
        throw new Error(`An invitation with id "${id}" already exists.`);
      }

      const password = randomBytes(18).toString("base64url");
      const salt = randomBytes(16);
      const hash = await derive(password, salt);
      const grants = [
        ...existing,
        {
          id,
          label,
          salt: salt.toString("base64url"),
          hash: hash.toString("base64url"),
          notBefore: starts.toISOString(),
          expiresAt: expires?.toISOString() ?? null,
        },
      ];

      console.log("\nInvitation created. The password is shown only in this output.");
      console.log(`\nACCESS PASSWORD\n${password}`);
      console.log(`\nPORTFOLIO_ACCESS_GRANTS\n${JSON.stringify(grants)}`);
      if (!process.env.PORTFOLIO_SESSION_SECRET) {
        console.log(
          `\nPORTFOLIO_SESSION_SECRET\n${randomBytes(32).toString("base64url")}`,
        );
      } else {
        console.log("\nKeep the existing PORTFOLIO_SESSION_SECRET unchanged.");
      }
      console.log(
        "\nShare only the access password. Keep both environment values secret.\n",
      );
    } catch (error) {
      fail(error instanceof Error ? error.message : "Unable to create invitation.");
    }
  }
}
