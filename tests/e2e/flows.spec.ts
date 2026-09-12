import { expect, test } from "@playwright/test";

/**
 * Critical flows — behavior tests only, no implementation details.
 * One test per user journey; failure means a user-visible break.
 */

test.describe("Critical flows", () => {
  test("homepage: primary navigation reaches its configured routes", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    for (const [label, route] of [
      ["About", "about"],
      ["Work", "work"],
      ["Thinking", "ideas"],
    ]) {
      await nav.getByRole("link", { name: label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/${route}$`));
      await expect(page.getByRole("main")).toBeVisible();
      await page.goto("/");
    }
  });

  test("featured case CTA reaches the Work story", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "EXPLORE THE CASE" }).click();
    await expect(page).toHaveURL(/\/work$/);
  });

  test("Work story and existing case-study detail remain reachable", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Work" })
      .click();
    await expect(page).toHaveURL(/\/work$/);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      /The technology was powerful/,
    );
    // The new Work landing page replaces the list, not existing detail URLs.
    await page.goto("/work/tresata");
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
    await page.goto("/resume");
    await expect(page.getByRole("heading", { level: 1, name: "Resume" })).toBeVisible();

    const downloadLink = page.getByRole("link", { name: /Download resume/i });
    await expect(downloadLink).toHaveAttribute("href", "/documents/resume.pdf");
    const response = await page.request.get("/documents/resume.pdf");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });

  test("contact: reachable from the homepage CTA", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "LET’S CONNECT" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeVisible();
  });
});
