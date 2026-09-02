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

/** Convenience schema for navigation items (see data/navigation.ts). */
export const navigationSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export type NavigationItem = z.infer<typeof navigationSchema>;
