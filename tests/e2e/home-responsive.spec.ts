import { expect, test } from "./fixtures";

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
    page.getByRole("dialog", { name: /The short version\? Right here\./ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
});

test("Productize film replaces the placeholder gallery and remains controllable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const film = page.locator(".prodshot.pf:not(.pf2)");
  await film.scrollIntoViewIfNeeded();
  await expect(film).toBeVisible();
  await expect(film.locator(".pf-stage > .pf-scene")).not.toHaveCount(0);
  await expect(page.getByText("The work, screen by screen")).toHaveCount(0);

  const control = film.locator(".pf-ctl");
  await expect(control).toHaveAttribute("aria-label", "Pause product film");
  await control.click();
  await expect(control).toHaveAttribute("aria-pressed", "true");
  await expect(control).toHaveAttribute("aria-label", "Play product film");
});

test("Productize film provides a stable reduced-motion frame", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const film = page.locator(".prodshot.pf:not(.pf2)");
  await film.scrollIntoViewIfNeeded();
  await expect(film).toBeVisible();
  await expect(film.locator(".pf-scene.on")).toHaveCount(1);
  await expect(film.locator(".pf-ctl")).toBeHidden();
});

test("Transform capability cloud and concept film are interactive", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await page.getByRole("tab", { name: /Chapter 2: Transform/ }).click();
  const transform = page.locator("#tp-transform");
  await expect(
    transform.getByRole("heading", { name: "Stop operating data. State the outcome." }),
  ).toBeVisible();

  const cloud = transform.locator(".cloud");
  await expect(cloud.locator(".pill")).toHaveCount(18);
  await cloud.getByRole("button", { name: "Lineage" }).click();
  await expect(cloud.locator(".cloud-cap")).toContainText(
    "Any value can be traced back to its source in one step.",
  );

  const film = transform.locator(".prodshot.pf2");
  await film.scrollIntoViewIfNeeded();
  await expect(film.locator(".pf-stage > .pf-scene")).toHaveCount(9);
  const control = film.locator(".pf-ctl");
  await expect(control).toHaveAttribute("aria-label", "Pause concept film");
  await control.click();
  await expect(control).toHaveAttribute("aria-pressed", "true");
  await expect(control).toHaveAttribute("aria-label", "Play concept film");
});

test("Transform concept film provides a stable reduced-motion frame", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await page.getByRole("tab", { name: /Chapter 2: Transform/ }).click();
  const film = page.locator("#tp-transform .prodshot.pf2");
  await film.scrollIntoViewIfNeeded();
  await expect(film.locator(".pf-scene.on")).toHaveCount(1);
  await expect(film.locator(".pf-ctl")).toBeHidden();
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

test("Impact matches the final supplied content and editorial layout", async ({
  page,
}) => {
  await page.goto("/");

  const impact = page.locator("#impact");
  await expect(impact).toContainText(
    "Across the US, London, Australia, Spain, Italy and Germany.",
  );
  await expect(impact).toContainText("adopted by ~8 pharma clients across 6 countries");
  await expect(impact.locator(".irow")).toHaveCount(3);
  await expect(impact.locator(".irow-fig")).toHaveCount(0);
});

test("homepage retains the final supplied Work, recommendation, and contact details", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("#work > .wrap > .shot")).toHaveCount(0);
  await expect(page.locator("#tp-productize .prodshot.pf")).toHaveCount(1);
  await expect(page.locator("#about .v-ctx")).toHaveCount(0);

  const conversation = page.locator("#connect");
  await expect(
    conversation.getByRole("link", { name: "info@anishkutty.com" }),
  ).toHaveAttribute("href", "mailto:info@anishkutty.com");
  await expect(
    conversation.getByRole("link", { name: "+1 980 860 1544" }),
  ).toHaveAttribute("href", "tel:+19808601544");
  await expect(page.locator("footer")).toHaveText("© 2026 Anish Velayudhan Kutty");
});
