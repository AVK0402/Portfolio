import { getCaseStudies } from "@/lib/content/getCaseStudies";
import { getArticles } from "@/lib/content/getArticles";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { ArticleCard } from "@/components/ideas/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container, Section } from "@/components/layout/Container";

/**
 * Homepage placeholder — intentionally content-free; composed of
 * future sections in src/components/sections/. Data flows in via the
 * content layer, presentation via components.
 *
 * Responsive composition example: content stacks on mobile (single
 * column) and gains intentional multi-column arrangement at md/lg —
 * composition, not scaling.
 */
export default async function Home() {
  const [caseStudies, articles] = await Promise.all([getCaseStudies(), getArticles()]);

  return (
    <main>
      <Section className="flex flex-1 items-center">
        <Container className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Architecture foundation ready.
          </h1>
          <p className="text-muted-foreground mt-(--space-md) leading-relaxed">
            Content, design and experience phases follow. See docs/ARCHITECTURE.md.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading>Work</SectionHeading>
          <div className="mt-(--space-lg) gap-(--space-xl) md:grid md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map(({ meta }) => (
              <CaseStudyCard key={meta.slug} caseStudy={meta} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading>Ideas</SectionHeading>
          <div className="mt-(--space-lg) gap-(--space-xl) md:grid md:grid-cols-2">
            {articles.map(({ meta }) => (
              <ArticleCard key={meta.slug} article={meta} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
