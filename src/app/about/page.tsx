import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";

export const metadata = buildMetadata({ title: "About" });

/** About — executive profile. Content is composed here in the content phase. */
export default function AboutPage() {
  return (
    <main id="main-content">
      <Container className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight">About</h1>
      </Container>
    </main>
  );
}
