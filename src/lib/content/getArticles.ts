import { mdxContentSource } from "./sources/mdx";
import type { ArticleItem } from "./types";

/** Getter for the `ideas` collection (articles), newest first. */
export async function getArticles(): Promise<ArticleItem[]> {
  return mdxContentSource.list("ideas");
}

export async function getArticle(slug: string): Promise<ArticleItem | null> {
  return mdxContentSource.get("ideas", slug);
}
