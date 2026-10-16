import { expect, test } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility smoke flow — WCAG 2.2 AA gates that must never regress:
 * document structure, skip link, landmarks, and an automated axe scan.
 */
test("home page renders with correct document structure", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Anish Velayudhan Kutty/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("main")).toBeVisible();
  // Exactly one h1 per page.
  await expect(page.locator("h1")).toHaveCount(1);
});

test("digital twin dialog plays the supplied video", async ({ page }) => {
  await page.goto("/");
  await page.locator(".twin-fab").evaluate((element) => element.classList.add("on"));
  await page
    .getByRole("link", { name: "Meet my digital twin, a 2-minute video" })
    .click();

  const dialog = page.locator("#twin");
  await expect(dialog).toHaveCSS("transform", "none");
  const dialogBox = await dialog.boundingBox();
  const viewport = page.viewportSize();
  expect(dialogBox).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(dialogBox!.width).toBeLessThanOrEqual(860);
  expect(
    Math.abs(dialogBox!.x + dialogBox!.width / 2 - viewport!.width / 2),
  ).toBeLessThan(1);
  expect(
    Math.abs(dialogBox!.y + dialogBox!.height / 2 - viewport!.height / 2),
  ).toBeLessThan(1);

  const video = page.locator('video[aria-label="Meet my digital twin video"]');
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("poster", "/images/home/final/twin-poster.jpg");
  await expect(video).toHaveAttribute("src", "/videos/home/twin.mp4");
  await page.getByRole("button", { name: "Play Meet my digital twin video" }).click();
  await expect(video).toHaveAttribute("controls", "");
  await expect(page.locator(".twin-media")).toHaveClass(/is-playing/);
  await expect
    .poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime))
    .toBeGreaterThan(0);

  await page.getByRole("button", { name: "720p" }).click();
  await expect(video).toHaveAttribute("src", "/videos/home/twin-720.mp4");
  await expect(page.getByRole("button", { name: "720p" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect
    .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
    .toBe(false);
});

test("skip link is the first tab stop and jumps to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeInViewport();
});

test("home page passes axe WCAG 2.2 AA scan", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  // Scan the floating invitation in its fully visible resting state, not while
  // opacity is transitioning against the page background.
  await page.locator(".twin-fab").evaluate((element) => element.classList.add("on"));
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
