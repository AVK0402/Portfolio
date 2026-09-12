import { expect, test } from "@playwright/test";

test("hero branches grow together once, hold, and respect mobile and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const pattern = page.locator(".hero-growing-path").last();
  await expect(pattern).toHaveCSS("animation-iteration-count", "1");
  await expect(page.locator(".hero-art svg")).toHaveCount(1);
  await expect(pattern).toHaveCSS("animation-duration", "8s");
  await expect(pattern).toHaveCSS("animation-delay", "0s");
  const arms = page.locator(".hero-growing-path");
  await expect(arms).toHaveCount(2);
  for (const arm of await arms.all()) {
    await expect(arm).toHaveCSS("animation-delay", "0s");
    await expect(arm).toHaveCSS("animation-duration", "8s");
    await expect(arm).toHaveAttribute("d", /L260\.424 744\.786$/);
  }
  await expect(pattern).toHaveCSS("stroke-dashoffset", "0px", { timeout: 10000 });
  await page.evaluate(() => window.scrollTo({ top: 1000, behavior: "instant" }));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(pattern).toHaveCSS("stroke-dashoffset", "0px");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(pattern).toHaveCSS("animation-name", "none");
  await expect(pattern).toHaveCSS("stroke-dashoffset", "0px");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 375, height: 900 });
  await expect(page.locator(".hero-art")).toBeHidden();
  await expect(pattern).toHaveCSS("animation-name", "none");
});

for (const width of [320, 375, 768, 1440]) {
  test(`homepage fits ${width}px and loads the system illustration`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    if (width >= 768) {
      const art = await page.locator(".hero-branches").boundingBox();
      const hero = await page.locator(".home-hero").boundingBox();
      expect(art!.x).toBeGreaterThanOrEqual(hero!.x);
      expect(art!.x + art!.width).toBeLessThanOrEqual(width);
      expect(art!.y).toBeGreaterThanOrEqual(hero!.y);
      expect(art!.y + art!.height).toBeCloseTo(hero!.y + hero!.height, 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const diagram = page.getByRole("img", { name: /WHERE IT STARTED/ });
    await diagram.scrollIntoViewIfNeeded();
    await expect(diagram).toBeVisible();
    await expect
      .poll(() =>
        diagram
          .locator("img")
          .evaluateAll((images) =>
            images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
          ),
      )
      .toBe(true);
  });
}
