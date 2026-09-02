import { buildMetadata } from "@/lib/seo/metadata";
import { Container, Section } from "@/components/layout/Container";
import { getArticles } from "@/lib/content/getArticles";
import { ArticleCard } from "@/components/ideas/ArticleCard";

export const metadata = buildMetadata({ title: "Ideas" });

/** Ideas index — lists published articles via the content layer. */
export default async function IdeasPage() {
  const articles = await getArticles();
  return (
    <main id="main-content">
      <Section>
        <Container>
          <h1 className="text-4xl font-semibold tracking-tight">Ideas</h1>
          <div className="mt-10 flex flex-col gap-10">
            {articles.map(({ meta }) => (
              <ArticleCard key={meta.slug} article={meta} />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
