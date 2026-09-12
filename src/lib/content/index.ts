import type { ContentSource } from "./types";
import { mdxContentSource } from "./sources/mdx";

/**
 * Content repository — the delegation point between storage and the UI.
 *
 * The active `ContentSource` is selected HERE, in one place. Pages,
 * components, the design system, routing and SEO only ever talk to the
 * getters (`getCaseStudies`, `getArticles`, …), never to a source
 * directly. This is what makes storage swappable:
 *
 *   MDX (sources/mdx.ts)  →  this repository (index.ts)  →  CMS adapter
 *
 * Migrating to a CMS means adding `sources/<cms>.ts` (implementing
 * `ContentSource`) and changing `contentSource` below to point at it.
 * Nothing else in the codebase changes.
 */
const contentSource: ContentSource = mdxContentSource;

/**
 * The content repository exposes `list` / `get` with the same signature
 * as every `ContentSource`. Getter modules import this, never a source.
 */
export const contentRepository: ContentSource = {
  list: (collection) => contentSource.list(collection),
  get: (collection, slug) => contentSource.get(collection, slug),
};
