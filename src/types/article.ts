export interface Article {
  slug: string;
  title: string;
  /** ISO 8601 date. */
  date: string;
  summary?: string;
  tags: string[];
  draft: boolean;
}
