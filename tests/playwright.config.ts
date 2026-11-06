import { defineConfig } from "@playwright/test";
import { RESEND_API_URL, RESEND_STUB_URL } from "./src/resend.ts";

const PREVIEW_URL = "http://127.0.0.1:8781";

const PREVIEW_VARS = [
  "ANTISPAM_SECRET_KEY:e2e-antispam-secret",
  "RESEND_API_KEY:re_e2e_stub",
  `RESEND_API_URL:${RESEND_API_URL}`,
]
  .map((value) => `--var ${value}`)
  .join(" ");

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: "list",
  webServer: [
    {
      command: "node src/resend-stub.ts",
      url: `${RESEND_STUB_URL}/__emails`,
      reuseExistingServer: false,
    },
    {
      // --var overrides .env; never reuse a server that could send real email.
      command: `pnpm --dir .. exec wrangler dev --port 8781 ${PREVIEW_VARS}`,
      url: PREVIEW_URL,
      reuseExistingServer: false,
    },
  ],
  use: {
    baseURL: PREVIEW_URL,
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 800 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
