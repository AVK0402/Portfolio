import { z } from "zod";
import type { Article } from "@/types/article";
import type { CaseStudy } from "@/types/work";
import type { MdxCollectionId, CollectionMeta } from "./registry";

/**
 * Zod contracts for MDX frontmatter, validated at load time
 * (invalid content fails the build). Domain shapes live in src/types/.
 * The UI never imports from this file — only the getters do.
 */

const baseSchema = z.object({
  /** URL slug — defaults to the file name in the MDX adapter. */
  slug: z.string().min(1),
  title: z.string().min(1),
  /** ISO 8601 date string. */
  date: z.string().min(1),
  summary: z.string().optional(),
  draft: z.boolean().default(false),
});

export const caseStudySchema = baseSchema.extend({
  client: z.string().optional(),
  role: z.string().optional(),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
});

export const articleSchema = baseSchema.extend({
  tags: z.array(z.string()).default([]),
});

export type { MdxCollectionId, CollectionMeta } from "./registry";

export interface ContentItem<TMeta> {
  meta: TMeta;
  /** Raw body (MDX source). Never rendered directly by UI components. */
  body: string;
}

export type CaseStudyItem = ContentItem<CaseStudy>;
export type ArticleItem = ContentItem<Article>;

/**
 * Content source contract. Any backing store — MDX files on disk today,
 * a headless CMS later — implements this interface. The active source
 * is selected in `lib/content/index.ts` (the content repository /
 * delegation point), so migrating storage never changes pages,
 * components, the design system, routing or SEO.
 */
export interface ContentSource {
  list<C extends MdxCollectionId>(
    collection: C,
  ): Promise<ContentItem<CollectionMeta[C]>[]>;
  get<C extends MdxCollectionId>(
    collection: C,
    slug: string,
  ): Promise<ContentItem<CollectionMeta[C]> | null>;
}
