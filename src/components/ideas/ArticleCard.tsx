import Link from "next/link";
import { routes } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";
import type { Article } from "@/types/article";

/** List card for an ideas article. Presentation only. */
export function ArticleCard({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  return (
    <Link href={routes.article(article.slug)} className={cn("block", className)}>
      <h3 className="font-semibold">{article.title}</h3>
      {article.summary && <p className="text-muted-foreground">{article.summary}</p>}
    </Link>
  );
}
