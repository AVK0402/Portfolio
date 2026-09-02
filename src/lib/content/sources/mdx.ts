import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  caseStudySchema,
  articleSchema,
  type CaseStudyItem,
  type ArticleItem,
  type ContentItem,
  type MdxCollectionId,
} from "../types";

/**
 * MDX (file system) source adapter.
 *
 * The ONLY module that knows content lives as MDX files on disk.
 * A future CMS adapter implements the same interface and is swapped
 * in the getter modules — routes and components stay untouched.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

const collectionSchemas = {
  work: caseStudySchema,
  ideas: articleSchema,
} as const;

type CollectionMeta = {
  work: CaseStudyItem["meta"];
  ideas: ArticleItem["meta"];
};

function collectionDir(collection: MdxCollectionId): string {
  return path.join(CONTENT_DIR, collection);
}

async function loadCollection<C extends MdxCollectionId>(
  collection: C,
): Promise<ContentItem<CollectionMeta[C]>[]> {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const schema = collectionSchemas[collection];
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

export const mdxContentSource = {
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
