import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility smoke flow — WCAG 2.2 AA gates that must never regress:
 * document structure, skip link, landmarks, and an automated axe scan.
 */
test("home page renders with correct document structure", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Executive Platform/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("main")).toBeVisible();
  // Exactly one h1 per page.
  await expect(page.locator("h1")).toHaveCount(1);
});

test("skip link is the first tab stop and jumps to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeInViewport();
});

test("home page passes axe WCAG 2.2 AA scan", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
