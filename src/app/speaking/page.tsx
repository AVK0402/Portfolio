import { buildMetadata } from "@/lib/seo/metadata";
import { Container, Section } from "@/components/layout/Container";
import { EngagementList } from "@/components/speaking/EngagementList";

export const metadata = buildMetadata({ title: "Speaking" });

/** Speaking — engagements list. */
export default function SpeakingPage() {
  return (
    <main id="main-content">
      <Section>
        <Container>
          <h1 className="text-4xl font-semibold tracking-tight">Speaking</h1>
          <div className="mt-10">
            <EngagementList />
          </div>
        </Container>
      </Section>
    </main>
  );
}
