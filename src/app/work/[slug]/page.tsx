import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { getCaseStudies } from "@/lib/content/getCaseStudies";
import { getCaseStudy } from "@/lib/content/getCaseStudies";
import { CaseStudyHero } from "@/components/work/CaseStudyHero";
import { ImpactMetrics } from "@/components/work/ImpactMetrics";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Static generation for every published case study. */
export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseStudy(slug);
  if (!item) return {};
  return buildMetadata({
    title: item.meta.title,
    description: item.meta.summary,
    path: `work/${slug}`,
  });
}

/** Case study detail — data via content layer, presentation via components. */
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const item = await getCaseStudy(slug);
  if (!item) notFound();

  return (
    <main id="main-content">
      <Section>
        <Container>
          <CaseStudyHero caseStudy={item.meta} />
          <div className="mt-10">
            <ImpactMetrics metrics={item.meta.metrics} />
          </div>
          {/* Case study body sections render here in the content phase. */}
        </Container>
      </Section>
    </main>
  );
}
