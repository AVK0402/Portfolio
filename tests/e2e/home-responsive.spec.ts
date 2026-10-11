import { expect, test } from "@playwright/test";

test("neural hero resolves into the headline and honors reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator(".lead-neural-canvas")).toBeVisible();
  await expect(page.locator(".lead-hero h1")).toHaveCSS("opacity", "1", {
    timeout: 5000,
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator(".lead-hero h1")).toHaveCSS("opacity", "1");
  await expect(page.locator(".lead-neural-canvas")).toBeVisible();
});

for (const width of [320, 375, 768, 1440]) {
  test(`leadership homepage fits ${width}px and preserves the narrative`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(page.locator(".lead-cinematic")).toHaveCount(5);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Designing the Future",
    );
    await expect(page.locator("#productize")).toBeVisible();
    await expect(page.locator("#impact")).toBeVisible();
  });
}
