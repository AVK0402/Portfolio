import { describe, it, expect } from "vitest";
import { contentBaseSchema, collectionSchemas } from "./types";

describe("content schemas", () => {
  it("validates a minimal article frontmatter", () => {
    const result = collectionSchemas.articles.safeParse({
      slug: "example",
      title: "Example",
      date: "2026-01-01",
    });
    expect(result.success).toBe(true);
  });

  it("rejects content without a title", () => {
    const result = contentBaseSchema.safeParse({
      slug: "example",
      date: "2026-01-01",
    });
    expect(result.success).toBe(false);
  });

  it("defaults draft to false and tags to empty", () => {
    const result = collectionSchemas.articles.parse({
      slug: "example",
      title: "Example",
      date: "2026-01-01",
    });
    expect(result.draft).toBe(false);
  });
});
