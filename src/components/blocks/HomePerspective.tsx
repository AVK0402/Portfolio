import { Container, Section } from "@/components/layout/Container";
import { SectionIntro } from "./SectionIntro";
import { NumberedColumns } from "./NumberedColumns";
import type { HomeContent } from "@/lib/content/getHome";

export function HomePerspective({ content }: { content: HomeContent["pointOfView"] }) {
  return (
    <Section className="home-perspective">
      <Container className="portfolio-container">
        <SectionIntro {...content} accent={false} />
        <NumberedColumns items={content.items} className="principle-columns" />
        <p className="section-closing">{content.closing}</p>
      </Container>
    </Section>
  );
}
