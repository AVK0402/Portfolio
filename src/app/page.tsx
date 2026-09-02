import { getCaseStudies } from "@/lib/content/getCaseStudies";
import { getArticles } from "@/lib/content/getArticles";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { ArticleCard } from "@/components/ideas/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Homepage placeholder — intentionally content-free; composed of
 * future sections in src/components/sections/. Data flows in via the
 * content layer, presentation via components.
 */
export default async function Home() {
  const [caseStudies, articles] = await Promise.all([getCaseStudies(), getArticles()]);

  return (
    <main className="flex flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-32">
        <h1 className="text-4xl font-semibold tracking-tight">
          Architecture foundation ready.
        </h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          Content, design and experience phases follow. See docs/ARCHITECTURE.md.
        </p>

        <section className="mt-16">
          <SectionHeading>Work</SectionHeading>
          <div className="mt-6 flex flex-col gap-8">
            {caseStudies.map(({ meta }) => (
              <CaseStudyCard key={meta.slug} caseStudy={meta} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading>Ideas</SectionHeading>
          <div className="mt-6 flex flex-col gap-8">
            {articles.map(({ meta }) => (
              <ArticleCard key={meta.slug} article={meta} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
