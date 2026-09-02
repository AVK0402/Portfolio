import { z } from "zod";

/**
 * Content domain types + validation schemas.
 *
 * This module is the CONTRACT between content sources and the UI.
 * The UI consumes only types from here — never file system, MDX,
 * or CMS specifics. Swapping MDX for a headless CMS means writing
 * a new adapter in `lib/content/sources/` that still satisfies
 * these schemas; no component or route changes required.
 */

export const contentBaseSchema = z.object({
  /** URL slug, unique per collection. */
  slug: z.string().min(1),
  title: z.string().min(1),
  /** ISO 8601 date string. */
  date: z.string().min(1),
  /** Optional short summary used in lists, meta descriptions, JSON-LD. */
  summary: z.string().optional(),
  draft: z.boolean().default(false),
});

export type ContentBase = z.infer<typeof contentBaseSchema>;

/** Collection ids — the stable vocabulary of the content architecture. */
export const collectionIds = [
  "articles",
  "portfolio",
  "speaking",
  "awards",
  "media",
] as const;

export type CollectionId = (typeof collectionIds)[number];

/**
 * Per-collection extensions. These remain intentionally minimal;
 * refine as each content type's real shape is defined.
 */
export const collectionSchemas = {
  articles: contentBaseSchema.extend({
    tags: z.array(z.string()).default([]),
  }),
  portfolio: contentBaseSchema.extend({
    /** Role the executive played in the transformation story. */
    role: z.string().optional(),
  }),
  speaking: contentBaseSchema.extend({
    venue: z.string().optional(),
  }),
  awards: contentBaseSchema.extend({}),
  media: contentBaseSchema.extend({}),
} satisfies Record<CollectionId, z.ZodType<ContentBase>>;

export type CollectionSchemas = typeof collectionSchemas;
export type CollectionMetaMap = {
  [C in keyof CollectionSchemas]: z.infer<CollectionSchemas[C]>;
};

/** A content item as consumed by the UI. Body is opaque (rendered by MDX/CMS renderer). */
export interface ContentItem<TMeta extends ContentBase = ContentBase> {
  meta: TMeta;
  /** Raw body (MDX source today). Never rendered directly by UI components. */
  body: string;
}
