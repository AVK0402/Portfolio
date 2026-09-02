import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Section } from "@/components/layout/Container";
import { getArticles, getArticle } from "@/lib/content/getArticles";
import { ArticleHeader } from "@/components/ideas/ArticleHeader";
import { ArticleContent } from "@/components/ideas/ArticleContent";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleJsonLd } from "@/lib/seo/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Static generation for every published article. */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map(({ meta }) => ({ slug: meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getArticle(slug);
  if (!item) return {};
  return buildMetadata({
    title: item.meta.title,
    description: item.meta.summary,
    path: `ideas/${slug}`,
  });
}

/** Article detail — server-rendered MDX via the content layer. */
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = await getArticle(slug);
  if (!item) notFound();

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(item.meta)) }}
      />
      <Section>
        <Container>
          <ArticleHeader article={item.meta} />
          <div className="mt-10">
            <ArticleContent body={item.body} />
          </div>
        </Container>
      </Section>
    </main>
  );
}
