import { z } from "zod";
import type { Article } from "@/types/article";
import type { CaseStudy } from "@/types/work";

/**
 * Zod contracts for MDX frontmatter, validated at load time
 * (invalid content fails the build). Domain shapes live in src/types/.
 * The UI never imports from this file — only the getters do.
 */

const baseSchema = z.object({
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

/** MDX collection ids — the stable vocabulary of the file-based content. */
export const mdxCollections = ["work", "ideas"] as const;

export type MdxCollectionId = (typeof mdxCollections)[number];

export interface ContentItem<TMeta> {
  meta: TMeta;
  /** Raw body (MDX source). Never rendered directly by UI components. */
  body: string;
}

export type CaseStudyItem = ContentItem<CaseStudy>;
export type ArticleItem = ContentItem<Article>;
