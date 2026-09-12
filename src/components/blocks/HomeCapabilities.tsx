import { Container, Section } from "@/components/layout/Container";
import { SectionIntro } from "./SectionIntro";
import { NumberedColumns } from "./NumberedColumns";
import type { HomeContent } from "@/lib/content/getHome";

export function HomeCapabilities({
  content,
}: {
  content: HomeContent["capabilities"];
}) {
  return (
    <Section className="home-capabilities">
      <Container className="portfolio-container">
        <SectionIntro {...content} />
        <NumberedColumns items={content.items} className="capability-columns" />
        <p className="section-closing">{content.closing}</p>
      </Container>
    </Section>
  );
}
