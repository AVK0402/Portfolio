import { Container, Section } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroBranches } from "./HeroBranches";
import { Link } from "@/components/ui/Link";
import type { HomeContent } from "@/lib/content/getHome";

export function HomeHero({ content }: { content: HomeContent["hero"] }) {
  return (
    <Section className="home-hero">
      <div className="hero-art" aria-hidden="true">
        <HeroBranches />
      </div>
      <Container className="portfolio-container hero-content">
        <SectionHeading as="h1" className="portfolio-hero-title">
          {content.title.map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </SectionHeading>
        <p className="hero-description">{content.description}</p>
        <p className="hero-disciplines">{content.disciplines}</p>
        <Link href={content.cta.href} className="portfolio-cta portfolio-cta-primary">
          {content.cta.label}
        </Link>
        <p className="hero-closing">{content.closing}</p>
      </Container>
    </Section>
  );
}
