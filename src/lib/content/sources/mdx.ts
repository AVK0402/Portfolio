import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CONTENT_DIR } from "@/config/constants";
import { mdxCollections } from "../registry";
import type { MdxCollectionId } from "../registry";
import type { CollectionMeta, ContentItem, ContentSource } from "../types";

/**
 * MDX (file system) source adapter.
 *
 * A concrete `ContentSource` implementation driven by the collection
 * registry — the only module that knows content lives as MDX files on
 * disk. A future CMS adapter implements the same `ContentSource`
 * interface and is swapped in `lib/content/index.ts`; routes and
 * components stay untouched.
 *
 * Note: the dynamic fs reads below produce a benign Turbopack build
 * warning ("tracing of the whole project"). Content is read strictly
 * at build time for SSG; nothing touches the filesystem at runtime.
 */

const CONTENT_ROOT = path.join(process.cwd(), CONTENT_DIR);

function collectionDir(collection: MdxCollectionId): string {
  return path.join(CONTENT_ROOT, collection);
}

async function loadCollection<C extends MdxCollectionId>(
  collection: C,
): Promise<ContentItem<CollectionMeta[C]>[]> {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const schema = mdxCollections[collection];
  const items: ContentItem<CollectionMeta[C]>[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
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
    items.push({ meta: parsed.data as CollectionMeta[C], body: content });
  }

  return items.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}

export const mdxContentSource: ContentSource = {
  list<C extends MdxCollectionId>(
    collection: C,
  ): Promise<ContentItem<CollectionMeta[C]>[]> {
    return loadCollection(collection);
  },
  get<C extends MdxCollectionId>(
    collection: C,
    slug: string,
  ): Promise<ContentItem<CollectionMeta[C]> | null> {
    return loadCollection(collection).then(
      (items) => items.find((i) => i.meta.slug === slug) ?? null,
    );
  },
};
