import { mdxContentSource, type ContentSource } from "./sources/mdx";
import type { CollectionId, ContentBase, ContentItem } from "./types";

/**
 * Content facade — the ONLY import surface for routes/components.
 *
 * Today it delegates to the MDX file-system source. When a headless
 * CMS is introduced, change this module's delegation (and add a new
 * source adapter); nothing else in the application changes.
 */

let source: ContentSource = mdxContentSource;

/** Swap the content source (e.g. bootstrapping a CMS adapter in tests). */
export function setContentSource(next: ContentSource): void {
  source = next;
}

export async function getCollection<C extends CollectionId>(
  collection: C,
): Promise<ContentItem<ContentBase>[]> {
  return source.list(collection) as Promise<ContentItem<ContentBase>[]>;
}

export async function getContentBySlug<C extends CollectionId>(
  collection: C,
  slug: string,
): Promise<ContentItem<ContentBase> | null> {
  return source.get(collection, slug) as Promise<ContentItem<ContentBase> | null>;
}

export type { CollectionId, ContentBase, ContentItem } from "./types";
