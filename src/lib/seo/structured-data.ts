import { siteConfig } from "@/config/site";
import { profile } from "@/data/profile";

/**
 * JSON-LD factories. Render results inside a <script type="application/ld+json">
 * on pages that need structured data.
 */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteConfig.url,
  };
}

export function articleJsonLd(article: {
  title: string;
  date: string;
  summary?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    description: article.summary,
    url: new URL(`/ideas/${article.slug}`, siteConfig.url).toString(),
    author: personJsonLd(),
  };
}
