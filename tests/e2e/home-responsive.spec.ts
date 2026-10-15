import { expect, test } from "@playwright/test";

test("homepage diagrams, chapters and digital-twin dialog are operable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator("#pf")).toBeVisible();
  await expect(page.locator("#system circle")).not.toHaveCount(0);

  await page.getByRole("tab", { name: /Chapter 2: Transform/ }).click();
  await expect(page.locator("#tp-transform")).toBeVisible();
  await expect(page.locator("#tp-productize")).toBeHidden();

  await page.locator("[data-twin]").first().click();
  await expect(
    page.getByRole("dialog", { name: /Don't have 20 minutes/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
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
    await expect(page.locator("main > section")).toHaveCount(9);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Designing the Future",
    );
    await expect(page.locator("#work")).toBeVisible();
    await expect(page.locator("#impact")).toBeVisible();
    await expect(page.locator("#connect")).toBeVisible();
  });
}
