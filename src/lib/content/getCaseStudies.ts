import { contentRepository } from "@/lib/content";
import type { CaseStudyItem } from "./types";

/**
 * Getter for the `work` collection (case studies), newest first.
 * Talks only to the content repository — never to a source directly.
 */
export async function getCaseStudies(): Promise<CaseStudyItem[]> {
  return contentRepository.list("work");
}

export async function getCaseStudy(slug: string): Promise<CaseStudyItem | null> {
  return contentRepository.get("work", slug);
}
