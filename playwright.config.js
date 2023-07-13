// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require("dotenv").config({ path: "./.env" });

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/e2e-junit-results.xml' }],
  ],
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'E2E Tests',
      testDir: './tests/e2e',
      use: { browserName: 'chromium' },
    },
    {
      name: 'API Tests',
      testDir: './tests/api',
      use: { baseURL: 'https://gateway.marvel.com:443/v1/public/' },
    },
  ],
});

