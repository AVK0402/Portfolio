import { Container, Section } from "@/components/layout/Container";
import { SectionIntro } from "./SectionIntro";
import type { HomeContent } from "@/lib/content/getHome";

export function HomeCredibility({ content }: { content: HomeContent["credibility"] }) {
  return (
    <Section className="home-credibility">
      <Container className="portfolio-container">
        <SectionIntro {...content} />
        <div className="career-recognition">
          <ul className="career-chapters">
            {content.chapters.map(({ discipline, lesson }) => (
              <li key={discipline}>
                <strong>{discipline}</strong>
                {lesson}
              </li>
            ))}
          </ul>
          <aside className="recognition" aria-labelledby="recognition-title">
            <h3 id="recognition-title">{content.recognitionLabel}</h3>
            <ul className="recognition-grid">
              {content.recognition.map((award) => (
                <li key={award.title}>
                  <h4>{award.title}</h4>
                  <p>{award.detail}</p>
                  <p className="recognition-company">{award.company}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
