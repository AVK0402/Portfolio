import { expect, test } from "@playwright/test";

/** Critical smoke flow: app renders, is accessible, and navigable. */
test("home page renders with correct document structure", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Executive Platform/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toBeVisible();
});
