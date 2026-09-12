import { z } from "zod";

/**
 * Environment variable validation.
 *
 * Public (NEXT_PUBLIC_*) variables are validated once at module load —
 * a bad or missing value fails loudly instead of silently producing a
 * broken site. Server-only secrets must NEVER be added here with a
 * NEXT_PUBLIC_ prefix (that embeds them in the client bundle); they
 * belong in server-only modules and are never committed.
 */
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_ANALYTICS_PROVIDER: z.enum(["vercel", "none"]).default("vercel"),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_ANALYTICS_PROVIDER: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
});

if (!parsed.success) {
  throw new Error(`Invalid environment configuration:\n${parsed.error.message}`);
}

export const env = parsed.data;
