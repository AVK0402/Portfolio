import Link from "next/link";
import { routes } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";
import type { CaseStudy } from "@/types/work";

/**
 * List card for a case study. Presentation only — all content via props.
 */
export function CaseStudyCard({
  caseStudy,
  className,
}: {
  caseStudy: CaseStudy;
  className?: string;
}) {
  return (
    <Link href={routes.caseStudy(caseStudy.slug)} className={cn("block", className)}>
      <h3 className="font-semibold">{caseStudy.title}</h3>
      {caseStudy.summary && (
        <p className="text-muted-foreground">{caseStudy.summary}</p>
      )}
    </Link>
  );
}
