# Private Portfolio Access

The site has a provider-independent access engine built into the existing Next.js
application. The deployed host only needs to run the Node.js server and provide four
environment values. Passwords are never stored in source code or sent to the browser.

## What it provides

- Independently expiring passwords, plus explicit non-expiring passwords that remain
  valid until revoked.
- Optional future start time for each invitation.
- Signed, HTTP-only sessions capped at 12 hours or the invitation expiry, whichever
  comes first.
- Immediate individual revocation by removing a grant; global revocation by changing
  `PORTFOLIO_ACCESS_VERSION` or rotating the session secret.
- A fail-closed production boundary: without valid grants and a session secret, the
  portfolio remains inaccessible and the access page reports that no invitation is
  available.
- No database, third-party identity service, new package, or host-specific API.

## Create an invitation

Run this locally, changing the label and expiry. Any ISO date/time with an explicit
timezone is accepted.

```bash
pnpm access:create -- --label "Company / role" --expires "2026-11-01T18:30:00+05:30"
```

For a password that remains valid until you revoke it, use the explicit no-expiry
option:

```bash
pnpm access:create -- --label "Portfolio access" --no-expiry
```

Non-expiring grants store `"expiresAt": null`. Omitting `expiresAt` is invalid and
keeps the site fail-closed, preventing an accidental typo from granting permanent
access.

The command prints:

1. the password to share securely with the interviewer;
2. the complete `PORTFOLIO_ACCESS_GRANTS` value;
3. a `PORTFOLIO_SESSION_SECRET` when one is not already present.

The command writes no file. Copy the two secret values into the hosting dashboard and
share only the generated access password. Keep the session secret unchanged when adding
future invitations.

To append to existing grants, make the current JSON available only for that command:

```bash
PORTFOLIO_ACCESS_GRANTS='[...]' PORTFOLIO_SESSION_SECRET='...' \
  pnpm access:create -- --label "Second company" --expires "2026-11-08T18:30:00+05:30"
```

## Required host environment values

| Variable                   | Purpose                                                     |
| -------------------------- | ----------------------------------------------------------- |
| `PORTFOLIO_ACCESS_GRANTS`  | Complete JSON array printed by the invitation command       |
| `PORTFOLIO_SESSION_SECRET` | Private signing key printed once by the command             |
| `PORTFOLIO_ACCESS_VERSION` | Optional global revocation version; defaults to `1`         |
| `PORTFOLIO_SESSION_HOURS`  | Optional session duration from 1–24 hours; defaults to `12` |

After changing an environment value, publish or restart the Node.js application so the
host supplies the new value to the running process.

## Revoke access

- One interviewer or a non-expiring password: remove that invitation object from
  `PORTFOLIO_ACCESS_GRANTS`, then publish/restart.
- Everyone immediately: increment `PORTFOLIO_ACCESS_VERSION`, then publish/restart.
- Emergency rotation: replace `PORTFOLIO_SESSION_SECRET`; this invalidates every session.

## Deployment constraints

This protection requires a Next.js Node.js deployment because `proxy.ts` runs before
the route and asset response. A static HTML export cannot enforce it. HTTPS is required
in production so the browser uses the `Secure`, `HttpOnly`, `SameSite=Strict`,
`__Host-` session cookie.

The GitHub repository must also be private. A password gate protects the deployed
website, but it cannot hide source content and public assets from a public repository.

Robots are instructed not to index the site, but `robots.txt` is not a security layer;
the signed server-side access boundary is the security control.
