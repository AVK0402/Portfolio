import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import type { AnalyticsProvider } from "../index";
import { setAnalyticsProvider } from "../index";

/**
 * Vercel Web Analytics adapter (cookie-less, privacy-conscious).
 * Registered as the active provider when the site config selects it.
 */

const vercelProvider: AnalyticsProvider = {
  id: "vercel",
  track(event) {
    // Vercel collects page views automatically; custom events are
    // forwarded via its window queue when available.
    if (typeof window === "undefined") return;
    const queue = (
      window as unknown as {
        va?: (method: string, ...args: unknown[]) => void;
      }
    ).va;
    queue?.("event", { name: event.name, data: event.properties });
  },
};

export function VercelAdapter() {
  setAnalyticsProvider(vercelProvider);
  return <VercelAnalytics />;
}
