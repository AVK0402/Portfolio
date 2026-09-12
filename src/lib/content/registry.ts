import { z } from "zod";
import { caseStudySchema, articleSchema } from "./types";

/**
 * MDX content collection registry — the single extension point for
 * rich-content collections.
 *
 * A "collection" is a set of content items sharing one frontmatter
 * contract. Today: `work` (case studies) and `ideas` (articles). Adding a
 * new rich-content feature later — AI experiments, newsletter archive,
 * podcasts, interviews, publications, media appearances, courses,
 * teaching, teaching resources, advisory pieces, … — requires exactly two
 * additive steps and NO architectural change:
 *
 *   1. add content files under `content/<id>/*.mdx` (or `.md`)
 *   2. register the id + its frontmatter schema HERE
 *
 * `MdxCollectionId` and `CollectionMeta` are derived from this map, so the
 * `ContentSource`, the content repository, the per-collection getters and
 * every page keep working unchanged. A future CMS adapter keeps the same
 * registry as its source of meta shapes.
 */
export const mdxCollections = {
  work: caseStudySchema,
  ideas: articleSchema,
} as const;

/** Every registered rich-content collection id (derived — never hand-edited). */
export type MdxCollectionId = keyof typeof mdxCollections;

type SchemaOutput<S> = S extends z.ZodType<infer Out> ? Out : never;

/**
 * Meta shape for each registered collection, derived from its schema.
 * The MDX adapter (and any future CMS adapter) must conform to these.
 */
export type CollectionMeta = {
  [K in MdxCollectionId]: SchemaOutput<(typeof mdxCollections)[K]>;
};
