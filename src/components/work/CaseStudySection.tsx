import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";

/**
 * Labeled section of a case study body (e.g. "Challenge", "Approach").
 * Content comes from the MDX body; this wraps structure, not data.
 */
export function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Divider className="my-(--space-xl)" />
      <SectionHeading>{title}</SectionHeading>
      <div className="mt-(--space-sm) leading-relaxed">{children}</div>
    </section>
  );
}
