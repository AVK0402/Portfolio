import { z } from "zod";

/**
 * Single source of truth for site-wide identity and configuration.
 * UI components must read from here — never hardcode identity values.
 * Later, values here can be sourced from a headless CMS without
 * changing any consuming component (they read from this module only).
 */
export const siteConfig = {
  name: "Executive Platform",
  /** TODO: replace with production values before launch. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  /** Used for JSON-LD, metadata templates, and future CMS mapping. */
  author: {
    name: "Full Name",
    role: "VP Design / Chief Design Officer",
    // email, socials, etc. — extend as identity content is defined.
  },
  analytics: {
    /** Provider id is abstracted; swap providers in lib/analytics only. */
    provider: (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "vercel") as
      "vercel" | "none",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Primary navigation is data-driven so routes/layouts never hardcode it. */
export const navigationSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export type NavigationItem = z.infer<typeof navigationSchema>;

/**
 * Placeholder navigation contract. Actual IA (information architecture)
 * is intentionally deferred — populate when content architecture is
 * finalized. Routes that do not exist yet must not be added here.
 */
export const primaryNavigation: NavigationItem[] = [];
