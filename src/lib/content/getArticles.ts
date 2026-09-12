import { contentRepository } from "@/lib/content";
import type { ArticleItem } from "./types";

/**
 * Getter for the `ideas` collection (articles), newest first.
 * Talks only to the content repository — never to a source directly.
 */
export async function getArticles(): Promise<ArticleItem[]> {
  return contentRepository.list("ideas");
}

export async function getArticle(slug: string): Promise<ArticleItem | null> {
  return contentRepository.get("ideas", slug);
}
