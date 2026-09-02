import { buildMetadata } from "@/lib/seo/metadata";
import { Container, Section } from "@/components/layout/Container";

export const metadata = buildMetadata({ title: "Contact" });

/** Contact — structure only; contact mechanics decided in the design phase. */
export default function ContactPage() {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        </Container>
      </Section>
    </main>
  );
}
