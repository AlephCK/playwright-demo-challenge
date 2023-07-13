// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require("dotenv").config();

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFile: 'results.html' }],
    ['junit', { outputFile: 'results.xml' }],
    ['dot'],
    ['list']
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

