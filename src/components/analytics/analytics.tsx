import type { ReactNode } from "react";

/**
 * Analytics mount point. Reads the provider configured in siteConfig
 * and renders the matching adapter. Adding Plausible/GA4 later means
 * adding one adapter file and one case here — no other call sites.
 */
import { VercelAdapter } from "@/lib/analytics/providers/vercel";
import { siteConfig } from "@/config/site";

export function Analytics({ children }: { children?: ReactNode }) {
  return (
    <>
      {siteConfig.analytics.provider === "vercel" && <VercelAdapter />}
      {children}
    </>
  );
}
