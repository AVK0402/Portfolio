import { siteConfig } from "@/config/site";
import { routes } from "@/config/navigation";
import { getCaseStudies } from "@/lib/content/getCaseStudies";
import { getArticles } from "@/lib/content/getArticles";
import type { MetadataRoute } from "next";

/**
 * Sitemap is generated from the content layer — new content collections
 * are added here as they come online, never maintained by hand.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, articles] = await Promise.all([getCaseStudies(), getArticles()]);

  const staticPaths = [
    routes.home,
    routes.about,
    routes.work,
    routes.values,
    routes.speaking,
    routes.ideas,
    routes.resume,
    routes.contact,
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
    })),
    ...caseStudies.map(({ meta }) => ({
      url: `${siteConfig.url}${routes.caseStudy(meta.slug)}`,
      lastModified: new Date(meta.date),
    })),
    ...articles.map(({ meta }) => ({
      url: `${siteConfig.url}${routes.article(meta.slug)}`,
      lastModified: new Date(meta.date),
    })),
  ];
}
