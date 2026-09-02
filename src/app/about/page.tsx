import { buildMetadata } from "@/lib/seo/metadata";
import { Container, Section } from "@/components/layout/Container";

export const metadata = buildMetadata({ title: "About" });

/** About — executive profile. Content is composed here in the content phase. */
export default function AboutPage() {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <h1 className="text-4xl font-semibold tracking-tight">About</h1>
        </Container>
      </Section>
    </main>
  );
}
