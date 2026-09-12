import { Section } from "@/components/layout/Container";
import { SectionIntro } from "@/components/blocks/SectionIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Image } from "@/components/ui/Image";
import { EngineerDiagram, BlueprintDiagram } from "./WorkDiagrams";
import type { ProductizeContent } from "@/lib/content/getProductize";

function WorkFacts({ facts }: { facts: readonly { value: string; label: string }[] }) {
  return (
    <dl className="work-facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.value}</dt>
          <dd>{fact.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function WorkCallout({ content }: { content: { label: string; text: string } }) {
  return (
    <aside className="work-callout">
      <p>{content.label}</p>
      <p>{content.text}</p>
    </aside>
  );
}

function WorkComparison({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: readonly { observed: string; mapped: string; question?: string }[];
}) {
  return (
    <table className="work-comparison">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.observed}>
            <td>
              {row.observed.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </td>
            <td>
              <strong>
                {row.mapped.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </strong>
              {row.question && <p>{row.question}</p>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ProductizeStory({ content }: { content: ProductizeContent }) {
  return (
    <article
      className="productize-story"
      id={content.id}
      tabIndex={-1}
      aria-label={content.hero.eyebrow}
    >
      <Section className="work-introduction">
        <p className="work-chapter-number" aria-hidden="true">
          {content.hero.number}
        </p>
        <p className="work-chapter-label">{content.hero.eyebrow}</p>
        <SectionHeading as="h1" className="work-title">
          {content.hero.title}
        </SectionHeading>
        <p className="section-description">{content.hero.description}</p>
        <WorkFacts facts={content.hero.facts} />
      </Section>
      <Section className="work-story-section work-constraint">
        <SectionIntro {...content.constraint} />
        <div className="work-constraint-details">
          <EngineerDiagram labels={content.constraint.diagram} />
          <dl className="work-findings">
            {content.constraint.findings.map((finding) => (
              <div key={finding.title}>
                <dt>{finding.title}</dt>
                <dd>{finding.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
      <Section className="work-story-section work-complexity">
        <SectionIntro {...content.complexity} />
        <WorkComparison
          columns={content.complexity.columns}
          rows={content.complexity.rows}
        />
        <WorkCallout content={content.complexity.callout} />
      </Section>
      <Section className="work-story-section work-mandate">
        <SectionIntro {...content.mandate} />
        <WorkFacts facts={content.mandate.facts} />
        <WorkCallout content={content.mandate.callout} />
      </Section>
      <Section className="work-story-section work-approach">
        <SectionIntro {...content.approach} />
        <WorkComparison
          columns={content.approach.columns}
          rows={content.approach.rows}
        />
        <WorkCallout content={content.approach.callout} />
      </Section>
      <Section className="work-story-section work-synthesis">
        <SectionIntro {...content.synthesis} />
        <BlueprintDiagram stages={content.synthesis.stages} />
        <WorkCallout content={content.synthesis.callout} />
      </Section>
      <Section className="work-story-section work-productization">
        <SectionIntro {...content.productization} />
        <figure className="work-product-visual">
          <figcaption>
            <SectionHeading as="h3">
              {content.productization.visualTitle}
            </SectionHeading>
            <p>{content.productization.visualDescription}</p>
          </figcaption>
          <div className="work-product-screen">
            <Image
              src="/images/work/productize/discover-connections.png"
              alt="Discover Connections product interface showing relationships across data entities."
              width={1004}
              height={520}
              sizes="(min-width: 1280px) 1001px, 100vw"
              unoptimized
            />
          </div>
          <Image
            className="work-slide-indicators"
            src="/images/work/productize/slide-indicators.svg"
            alt=""
            width={64}
            height={10}
          />
        </figure>
        <WorkCallout content={content.productization.callout} />
      </Section>
    </article>
  );
}
