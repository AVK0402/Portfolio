import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
import { getProductize } from "@/lib/content/getProductize";
import { ProductizeStory } from "@/components/work/ProductizeStory";
import { WorkQuickLinks } from "@/components/work/WorkQuickLinks";

export const metadata = buildMetadata({
  title: "Work",
  path: "work",
  description: getProductize().hero.description,
});

/** Continuous Productize story. Existing /work/[slug] routes remain available. */
export default function WorkPage() {
  const content = getProductize();
  return (
    <main id="main-content" className="portfolio-work">
      <Container className="work-layout">
        <div className="work-sticky-header">
          <header className="work-case-header">
            <p className="work-case-eyebrow">{content.header.eyebrow}</p>
            <p className="work-case-title">{content.header.title}</p>
          </header>
          <WorkQuickLinks items={content.quickLinks} activeId={content.id} />
        </div>
        <ProductizeStory content={content} />
      </Container>
    </main>
  );
}
