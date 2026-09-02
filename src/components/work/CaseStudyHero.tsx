import { SectionHeading } from "@/components/ui/SectionHeading";

import type { CaseStudy } from "@/types/work";

/**
 * Detail-page hero — renders the page's single h1 (WCAG 1.3.1 heading
 * hierarchy) plus context line and summary.
 */
export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const context = [caseStudy.client, caseStudy.role].filter(Boolean).join(" · ");
  return (
    <header>
      <SectionHeading as="h1">{caseStudy.title}</SectionHeading>
      {context && <p className="text-muted-foreground">{context}</p>}
      {caseStudy.summary && <p>{caseStudy.summary}</p>}
    </header>
  );
}
