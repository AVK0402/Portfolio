"use client";

import { useEffect } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import type { AnalyticsProvider } from "../index";
import { setAnalyticsProvider } from "../index";

/**
 * Vercel Web Analytics adapter (cookie-less, privacy-conscious).
 * The only client component in the analytics layer.
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

/** Render-side registration happens in an effect — never during render. */
export function VercelAdapter() {
  useEffect(() => {
    setAnalyticsProvider(vercelProvider);
  }, []);
  return <VercelAnalytics />;
}
