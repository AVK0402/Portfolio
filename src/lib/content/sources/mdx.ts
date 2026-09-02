import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { collectionSchemas, type CollectionId, type ContentItem } from "../types";

/**
 * MDX (file system) source adapter.
 *
 * The ONLY module in the codebase that knows content lives as MDX
 * files on disk. A future CMS adapter (e.g. Contentful/Sanity) will
 * implement the same `ContentSource` interface and be swapped in
 * `lib/content/index.ts` — routes and components stay untouched.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ContentSource {
  list(collection: CollectionId): Promise<ContentItem[]>;
  get(collection: CollectionId, slug: string): Promise<ContentItem | null>;
}

function collectionDir(collection: CollectionId): string {
  return path.join(CONTENT_DIR, collection);
}

async function loadCollection(collection: CollectionId): Promise<ContentItem[]> {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items: ContentItem[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    const schema = collectionSchemas[collection];
    const parsed = schema.safeParse({
      ...data,
      slug: data.slug ?? path.parse(file).name,
    });
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in ${collection}/${file}: ${parsed.error.message}`,
      );
    }
    if (parsed.data.draft && process.env.NODE_ENV === "production") continue;
    items.push({ meta: parsed.data, body: content });
  }

  return items.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export const mdxContentSource: ContentSource = {
  async list(collection) {
    return loadCollection(collection);
  },
  async get(collection, slug) {
    const items = await loadCollection(collection);
    return items.find((i) => i.meta.slug === slug) ?? null;
  },
};
