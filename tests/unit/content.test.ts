import { describe, it, expect } from "vitest";
import { caseStudySchema, articleSchema } from "@/lib/content/types";

describe("content contracts", () => {
  it("validates minimal case study frontmatter and defaults metrics", () => {
    const result = caseStudySchema.safeParse({
      title: "Example Case Study",
      date: "2026-01-01",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.metrics).toEqual([]);
  });

  it("validates article frontmatter and defaults tags", () => {
    const result = articleSchema.parse({
      title: "Example Article",
      date: "2026-01-01",
    });
    expect(result.tags).toEqual([]);
    expect(result.draft).toBe(false);
  });

  it("rejects content without a title", () => {
    const result = caseStudySchema.safeParse({ date: "2026-01-01" });
    expect(result.success).toBe(false);
  });

  it("round-trips case study metrics", () => {
    const result = caseStudySchema.parse({
      title: "Example",
      date: "2026-01-01",
      metrics: [{ label: "NPS uplift", value: "+32" }],
    });
    expect(result.metrics[0]).toEqual({ label: "NPS uplift", value: "+32" });
  });
});
