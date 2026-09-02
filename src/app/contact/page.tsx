import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";

export const metadata = buildMetadata({ title: "Contact" });

/** Contact — structure only; contact mechanics decided in the design phase. */
export default function ContactPage() {
  return (
    <main>
      <Container className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
      </Container>
    </main>
  );
}
