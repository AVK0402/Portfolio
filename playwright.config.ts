import { defineConfig } from "@playwright/test";

/**
 * E2E config: covers only critical flows (navigation, content pages,
 * contact paths). Base URL comes from PLAYWRIGHT_BASE_URL or the
 * production preview dev server.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "pnpm build && pnpm start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
      },
});
