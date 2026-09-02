import { buildMetadata } from "@/lib/seo/metadata";
import { Container, Section } from "@/components/layout/Container";
import { Link } from "@/components/ui/Link";
import { getSpeaking } from "@/lib/content/getSpeaking";
import { getValues } from "@/lib/content/getValues";

export const metadata = buildMetadata({ title: "Resume" });

/**
 * Resume — composed from the data layer (experience, awards) plus the
 * content layer (speaking, values). A downloadable PDF is served from
 * public/documents/resume.pdf.
 */
export default async function ResumePage() {
  const [experience, awards, speaking, values] = await Promise.all([
    (await import("@/data/experience")).experience,
    (await import("@/data/awards")).awards,
    getSpeaking(),
    getValues(),
  ]);
  return (
    <main id="main-content">
      <Section>
        <Container>
          <h1 className="text-4xl font-semibold tracking-tight">Resume</h1>
          <p className="text-muted-foreground">
            {experience.length} roles · {awards.length} awards · {speaking.length}{" "}
            engagements · {values.length} values
          </p>
          <Link
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background mt-(--space-md) inline-block rounded-md px-(--space-sm) py-(--space-2xs) font-medium"
          >
            Download resume (PDF)
          </Link>
        </Container>
      </Section>
    </main>
  );
}
