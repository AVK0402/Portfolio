import { expect, test } from "@playwright/test";

test("Primary navigation stays sticky without overlapping the Work header", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/work"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
      const header = page.getByRole("banner");
      await expect.poll(async () => (await header.boundingBox())?.y).toBe(0);
      if (route === "/work") {
        await expect
          .poll(async () => {
            const primary = await header.boundingBox();
            const secondary = await page.locator(".work-sticky-header").boundingBox();
            return Math.abs(secondary!.y - primary!.height);
          })
          .toBeLessThan(1);
      }
    }
  }
});

test("Productize stays active and Quick Links stays sticky through the story", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/work");
  const quickLinks = page.getByRole("navigation", { name: "Quick Links" });
  const productize = quickLinks.getByRole("link", { name: "PRODUCTIZE" });
  await expect(productize).toHaveAttribute("aria-current", "location");
  await expect(quickLinks.getByRole("link")).toHaveCount(1);
  await expect(quickLinks.locator("[aria-disabled=true]")).toHaveCount(3);
  for (const top of [1600, 3500, 5500]) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), top);
    await expect.poll(async () => (await quickLinks.boundingBox())?.y).toBe(236);
    await expect
      .poll(async () => (await page.locator(".work-case-header").boundingBox())?.y)
      .toBe(72);
    await expect(productize).toHaveAttribute("aria-current", "location");
  }
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");
  await productize.click();
  await expect(page).toHaveURL(/\/work#productize$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(100);
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
});

test("Productize anchor respects reduced motion and does not leak Work styling to Home", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/work#productize");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Anish Velayudhan Kutty" })
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByText("Design & Product Transformation Leader", { exact: true }),
  ).toBeVisible();
});

for (const width of [320, 375, 768, 1280, 1440]) {
  test(`Work page fits ${width}px with a readable continuous story`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/work");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 2 })).toHaveCount(6);
    const screen = page.getByRole("img", {
      name: /Discover Connections product interface/,
    });
    await screen.scrollIntoViewIfNeeded();
    await expect
      .poll(() => screen.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect(
      page.getByRole("navigation", { name: "Quick Links" }),
    ).toBeInViewport();
  });
}
