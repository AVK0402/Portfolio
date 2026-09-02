import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
import { getCaseStudies } from "@/lib/content/getCaseStudies";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";

export const metadata = buildMetadata({ title: "Work" });

/** Work index — lists published case studies via the content layer. */
export default async function WorkPage() {
  const caseStudies = await getCaseStudies();
  return (
    <main>
      <Container className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Work</h1>
        <div className="mt-10 flex flex-col gap-10">
          {caseStudies.map(({ meta }) => (
            <CaseStudyCard key={meta.slug} caseStudy={meta} />
          ))}
        </div>
      </Container>
    </main>
  );
}
