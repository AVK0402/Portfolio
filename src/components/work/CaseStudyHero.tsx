import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseStudy } from "@/types/work";

/**
 * Detail-page header for a case study: title, context line, summary.
 */
export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const context = [caseStudy.client, caseStudy.role].filter(Boolean).join(" · ");
  return (
    <header>
      <SectionHeading as="h2">{caseStudy.title}</SectionHeading>
      {context && <p className="text-muted-foreground">{context}</p>}
      {caseStudy.summary && <p>{caseStudy.summary}</p>}
    </header>
  );
}
