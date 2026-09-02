import { siteConfig } from "@/config/site";
import { getCollection } from "@/lib/content";
import type { MetadataRoute } from "next";

/**
 * Sitemap is generated from the content layer — new content collections
 * are added here as routes come online, never maintained by hand.
 * Static routes can be appended to the staticRoutes array.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
  ];

  const articles = await getCollection("articles");

  return [
    ...staticRoutes,
    ...articles.map(({ meta }) => ({
      url: `${siteConfig.url}/articles/${meta.slug}`,
      lastModified: new Date(meta.date),
    })),
  ];
}
