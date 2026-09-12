import { Container, Section } from "@/components/layout/Container";
import { SectionIntro } from "@/components/blocks/SectionIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Link } from "@/components/ui/Link";
import { SystemDiagram } from "./SystemDiagram";
import type { HomeContent } from "@/lib/content/getHome";

export function FeaturedWork({ content }: { content: HomeContent["featured"] }) {
  const study = content.caseStudy;
  return (
    <Section className="home-featured">
      <Container className="portfolio-container">
        <SectionIntro {...content} />
        <SystemDiagram content={content.diagram} />
        <article className="featured-case">
          <Divider />
          <div className="featured-case-heading">
            <p>{study.eyebrow}</p>
            <SectionHeading as="h3" className="portfolio-case-title">
              {study.title}
            </SectionHeading>
          </div>
          <Divider />
          <dl className="case-outcomes">
            {study.outcomes.map((outcome) => (
              <div key={outcome.title}>
                <dt>{outcome.title}</dt>
                <dd>{outcome.description}</dd>
              </div>
            ))}
          </dl>
          <Link href={study.cta.href} className="portfolio-cta portfolio-cta-secondary">
            {study.cta.label}
          </Link>
        </article>
      </Container>
    </Section>
  );
}
