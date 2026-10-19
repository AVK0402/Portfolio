import { expect, test } from "./fixtures";

/**
 * Critical flows — behavior tests only, no implementation details.
 * One test per user journey; failure means a user-visible break.
 */

test.describe("Critical flows", () => {
  test("homepage: primary navigation reaches its supplied sections", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    for (const [label, target] of [
      ["Work", "work"],
      ["Leadership", "leadership"],
      ["About", "about"],
    ]) {
      await page.goto("/");
      const link = page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: label, exact: true });
      await link.click();
      await expect(page).toHaveURL(new RegExp(`/#${target}$`));
      await expect(page.locator(`#${target}`)).toBeInViewport();
      await expect(link).toHaveClass(/\bon\b/);
    }
  });

  test("homepage narrative CTA reaches the featured work chapter", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Read the work" }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.locator("#work")).toBeInViewport();
  });

  test("Work story and existing case-study detail remain reachable", async ({
    page,
  }) => {
    await page.goto("/work");
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

  test("homepage header: resume downloads and LinkedIn remains reachable", async ({
    page,
  }) => {
    await page.goto("/");

    const primary = page.getByRole("navigation", { name: "Primary" });
    const resume = primary.getByRole("link", { name: "Download resume (PDF)" });
    await expect(resume).toHaveAttribute("href", "/documents/resume.pdf");
    await expect(resume).toHaveAttribute(
      "download",
      "Anish_Velayudhan_Kutty_Resume.pdf",
    );
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      resume.click(),
    ]);
    expect(download.suggestedFilename()).toBe("Anish_Velayudhan_Kutty_Resume.pdf");

    const linkedin = primary.getByRole("link", {
      name: "LinkedIn profile (opens in a new tab)",
    });
    await expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/anishvelayudhankutty/",
    );
    await expect(linkedin).toHaveAttribute("target", "_blank");

    const aboutResume = page.getByRole("link", { name: "Download résumé ↘" });
    await expect(aboutResume).toHaveAttribute("href", "/documents/resume.pdf");
    await expect(aboutResume).toHaveAttribute(
      "download",
      "Anish_Velayudhan_Kutty_Resume.pdf",
    );
  });
});
