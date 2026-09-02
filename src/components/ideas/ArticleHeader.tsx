import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Article } from "@/types/article";

/** Detail-page header — renders the page's single h1. */
export function ArticleHeader({ article }: { article: Article }) {
  return (
    <header>
      <SectionHeading as="h1">{article.title}</SectionHeading>
      <p className="text-muted-foreground">
        <time dateTime={article.date}>{article.date}</time>
        {article.summary && ` — ${article.summary}`}
      </p>
    </header>
  );
}
