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
    <section aria-labelledby={undefined}>
      <Divider className="my-10" />
      <SectionHeading>{title}</SectionHeading>
      <div className="mt-4 leading-relaxed">{children}</div>
    </section>
  );
}
