import { siteConfig } from "@/config/site";

/**
 * SEO helper — builds Next.js Metadata consistently across routes.
 * Routes should use this instead of hand-assembling metadata objects.
 */
import type { Metadata } from "next";

interface PageMetadataInput {
  title: string;
  description?: string;
  /** Path without leading slash, e.g. "articles/my-post". Omit for home. */
  path?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  noIndex,
}: PageMetadataInput): Metadata {
  const url = new URL(path ? `/${path}` : "/", siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

/** Organization/Person JSON-LD factory for structured data. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    url: siteConfig.url,
  };
}
