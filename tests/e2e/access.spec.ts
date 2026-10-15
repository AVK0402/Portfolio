import { expect, test } from "@playwright/test";
import { ACCESS_TEST_PASSWORD } from "./access-test-config";

test("private portfolio rejects anonymous access and accepts a current invitation", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page).toHaveURL(/\/access\?returnTo=%2Fwork$/);
  await expect(
    page.getByRole("heading", { name: /A considered body of work/ }),
  ).toBeVisible();
  await page.setViewportSize({ width: 320, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);

  await page.getByRole("textbox", { name: "Access password" }).fill("incorrect");
  await page.getByRole("button", { name: /View portfolio/ }).click();
  await expect(page.locator("#access-error")).toContainText(
    "invalid or its invitation",
  );

  await page
    .getByRole("textbox", { name: "Access password" })
    .fill(process.env.PLAYWRIGHT_ACCESS_PASSWORD ?? ACCESS_TEST_PASSWORD);
  await page.getByRole("button", { name: /View portfolio/ }).click();
  await expect(page).toHaveURL(/\/work$/);

  const cookie = (await page.context().cookies()).find(({ name }) =>
    name.endsWith("portfolio-access"),
  );
  expect(cookie).toMatchObject({ httpOnly: true, sameSite: "Strict" });
});
