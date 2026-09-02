import { mdxContentSource } from "./sources/mdx";
import type { CaseStudyItem } from "./types";

/** Getter for the `work` collection (case studies), newest first. */
export async function getCaseStudies(): Promise<CaseStudyItem[]> {
  return mdxContentSource.list("work");
}

export async function getCaseStudy(slug: string): Promise<CaseStudyItem | null> {
  return mdxContentSource.get("work", slug);
}
