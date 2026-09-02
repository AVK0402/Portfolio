import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/layout/Container";
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
    <main>
      <Container className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Resume</h1>
        <p className="text-muted-foreground">
          {experience.length} roles · {awards.length} awards · {speaking.length}{" "}
          engagements · {values.length} values
        </p>
      </Container>
    </main>
  );
}
