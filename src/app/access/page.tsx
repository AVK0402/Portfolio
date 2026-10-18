import type { Metadata } from "next";
import { getActiveGrants, readAccessConfig } from "@/lib/access/config";
import { sanitizeReturnTo } from "@/lib/access/request";
import { siteConfig } from "@/config/site";
import styles from "./access.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private access",
  description: `Private access to ${siteConfig.name}'s portfolio.`,
  robots: { index: false, follow: false, noarchive: true },
};

type AccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AccessPage({ searchParams }: AccessPageProps) {
  const params = await searchParams;
  const returnTo = sanitizeReturnTo(firstValue(params.returnTo));
  const hasError = firstValue(params.error) === "invalid";
  const configResult = readAccessConfig();
  const canSignIn =
    configResult.status === "ready" && getActiveGrants(configResult.config).length > 0;

  return (
    <main id="main-content" className={`access-gate ${styles.page}`}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <a href="/access" className={styles.identity} aria-label="Private portfolio">
            {siteConfig.name}
          </a>
          <span className={styles.status}>Private portfolio</span>
        </header>

        <section className={styles.card} aria-labelledby="access-title">
          <p className={styles.eyebrow}>Invitation only</p>
          <h1 id="access-title" className={styles.title}>
            A considered body of work, shared with care.
          </h1>
          <p className={styles.intro}>
            Enter the access password included with your invitation. For your security,
            each browser session expires automatically.
          </p>

          {canSignIn ? (
            <form action="/api/access/login" method="post" className={styles.form}>
              <input type="hidden" name="returnTo" value={returnTo} />
              <label htmlFor="portfolio-password" className={styles.label}>
                Access password
              </label>
              <input
                id="portfolio-password"
                name="password"
                type="password"
                required
                maxLength={256}
                autoComplete="current-password"
                autoFocus
                aria-describedby={hasError ? "access-error" : "access-hint"}
                aria-invalid={hasError || undefined}
                className={styles.input}
              />
              <p id="access-hint" className={styles.hint}>
                Passwords are case-sensitive.
              </p>
              {hasError ? (
                <p id="access-error" role="alert" className={styles.error}>
                  That password is invalid or its invitation has expired.
                </p>
              ) : null}
              <button type="submit" className={styles.button}>
                View portfolio <span aria-hidden="true">→</span>
              </button>
            </form>
          ) : (
            <div className={styles.notice} role="status">
              <strong>Access is not currently available.</strong>
              <span>Please request a current invitation from Anish.</span>
            </div>
          )}
        </section>

        <p className={styles.footnote}>
          Shared for evaluation only. Please do not redistribute.
        </p>
      </div>
    </main>
  );
}
