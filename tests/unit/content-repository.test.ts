import { describe, it, expect } from "vitest";
import { contentRepository } from "@/lib/content";
import { mdxContentSource } from "@/lib/content/sources/mdx";
import { getCaseStudies } from "@/lib/content/getCaseStudies";
import { mdxCollections } from "@/lib/content/registry";
import type { ContentSource } from "@/lib/content/types";

describe("content repository (CMS-ready delegation)", () => {
  it("exposes list/get matching the ContentSource contract", () => {
    const repo: ContentSource = contentRepository;
    expect(typeof repo.list).toBe("function");
    expect(typeof repo.get).toBe("function");
  });

  it("is wired to the MDX source adapter", () => {
    const source: ContentSource = mdxContentSource;
    expect(typeof source.list).toBe("function");
    expect(typeof source.get).toBe("function");
  });

  it("delegates to the active source and reads on-disk MDX", async () => {
    const articles = await contentRepository.list("ideas");
    expect(articles.length).toBeGreaterThan(0);
    // the placeholder article is non-draft, so it is always present
    expect(articles.some((a) => a.meta.slug === "example-article")).toBe(true);
    // body is the raw MDX source — never rendered directly by the UI
    expect(typeof articles[0]!.body).toBe("string");
  });

  it("get returns null for a missing slug", async () => {
    const missing = await contentRepository.get("ideas", "does-not-exist");
    expect(missing).toBeNull();
  });

  it("public getters route through the repository", async () => {
    const [viaRepo, viaGetter] = await Promise.all([
      contentRepository.list("work"),
      getCaseStudies(),
    ]);
    expect(viaGetter.map((i) => i.meta.slug)).toEqual(viaRepo.map((i) => i.meta.slug));
  });

  it("every registered collection is resolvable through the repository", async () => {
    // Adding a rich-content feature = add content/<id>/*.mdx + ONE registry
    // entry. Its id + meta type propagate to the ContentSource, repository
    // and getters automatically — no restructuring.
    const ids = Object.keys(mdxCollections) as (keyof typeof mdxCollections)[];
    for (const id of ids) {
      const items = await contentRepository.list(id);
      expect(Array.isArray(items)).toBe(true);
    }
  });
});
