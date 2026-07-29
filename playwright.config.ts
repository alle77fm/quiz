import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4300",
  },
  webServer: {
    command: "npm run build && npm run start -- --port 4300",
    url: "http://127.0.0.1:4300",
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
