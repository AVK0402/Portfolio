import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
import { EngagementList } from "@/components/speaking/EngagementList";

export const metadata = buildMetadata({ title: "Speaking" });

/** Speaking — engagements list. */
export default function SpeakingPage() {
  return (
    <main id="main-content">
      <Container className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Speaking</h1>
        <div className="mt-10">
          <EngagementList />
        </div>
      </Container>
    </main>
  );
}
