import { expect, test } from "@playwright/test";

/**
 * Critical flows — behavior tests only, no implementation details.
 * One test per user journey; failure means a user-visible break.
 */

test.describe("Critical flows", () => {
  test("homepage: primary navigation reaches every top-level route", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    for (const route of [
      "about",
      "work",
      "values",
      "speaking",
      "ideas",
      "resume",
      "contact",
    ]) {
      await nav.getByRole("link", { name: new RegExp(route, "i") }).click();
      await expect(page).toHaveURL(new RegExp(`/${route}$`));
      await expect(page.getByRole("main")).toBeVisible();
      await page.goto("/");
    }
  });

  test("case-study: home → work list → case study detail", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Work" })
      .click();
    await expect(page).toHaveURL(/\/work$/);

    const firstCaseStudy = page.getByRole("main").getByRole("link").first();
    await firstCaseStudy.click();
    // Detail page: single h1 with the case-study title.
    await expect(page.locator("h1")).toBeVisible();
    await expect(page).not.toHaveURL(/\/work$/);
  });

  test("article: ideas list → article detail renders body", async ({ page }) => {
    await page.goto("/ideas");
    await page
      .getByRole("main")
      .getByRole("link", { name: /Example Article/i })
      .click();
    await expect(page).toHaveURL(/\/ideas\/example-article$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Example Article/);
    // MDX body rendered (h2 from the article markdown).
    await expect(page.getByRole("heading", { level: 2 })).toBeVisible();
  });

  test("resume: page reachable and PDF downloadable", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Resume" })
      .click();
    await expect(page.getByRole("heading", { level: 1, name: "Resume" })).toBeVisible();

    const downloadLink = page.getByRole("link", { name: /Download resume/i });
    await expect(downloadLink).toHaveAttribute("href", "/documents/resume.pdf");
    const response = await page.request.get("/documents/resume.pdf");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });

  test("contact: reachable from primary navigation", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Contact" })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeVisible();
  });
});
