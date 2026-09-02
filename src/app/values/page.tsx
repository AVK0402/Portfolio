import { buildMetadata } from "@/lib/seo/metadata";
import { Container, Section } from "@/components/layout/Container";
import { getValues } from "@/lib/content/getValues";

export const metadata = buildMetadata({ title: "Values" });

/** Values — leadership principles from content/values/principles.ts. */
export default async function ValuesPage() {
  const values = await getValues();
  return (
    <main id="main-content">
      <Section>
        <Container>
          <h1 className="text-4xl font-semibold tracking-tight">Values</h1>
          <div className="mt-10 flex flex-col gap-10">
            {values.map((value) => (
              <section key={value.id}>
                <h2 className="font-semibold">{value.title}</h2>
                <p className="text-muted-foreground">{value.description}</p>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
