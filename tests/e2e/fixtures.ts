import { expect, test as base } from "@playwright/test";
import { ACCESS_TEST_PASSWORD } from "./access-test-config";

export const test = base.extend({
  page: async ({ page }, providePage) => {
    await page.goto("/access");
    await page
      .getByRole("textbox", { name: "Access password" })
      .fill(process.env.PLAYWRIGHT_ACCESS_PASSWORD ?? ACCESS_TEST_PASSWORD);
    await page.getByRole("button", { name: /View portfolio/ }).click();
    await expect(page).toHaveURL(/\/$/);
    await providePage(page);
  },
});

export { expect } from "@playwright/test";
