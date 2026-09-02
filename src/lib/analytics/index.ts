/**
 * Analytics abstraction.
 *
 * The application calls only `track()` and renders `<Analytics />`.
 * Provider specifics (Vercel today; Plausible/GA4/etc. later) are
 * isolated in `providers/` behind the `AnalyticsProvider` interface.
 */

export interface AnalyticsProvider {
  readonly id: string;
  /** Initialize any provider-side script/config. No-op for declarative providers. */
  init?(): void;
  /** Emit a structured, privacy-conscious event. Never PII. */
  track(event: AnalyticsEvent): void;
}

export interface AnalyticsEvent {
  /** e.g. "nav_click", "article_read", "contact_cta" */
  name: string;
  /** Scalar properties only; no user identifiers. */
  properties?: Record<string, string | number | boolean>;
}

class NoopProvider implements AnalyticsProvider {
  readonly id = "none";
  track(): void {
    /* analytics disabled */
  }
}

let provider: AnalyticsProvider = new NoopProvider();

export function setAnalyticsProvider(next: AnalyticsProvider): void {
  provider = next;
  next.init?.();
}

/** Stable application-facing API. */
export function track(event: AnalyticsEvent): void {
  provider.track(event);
}
