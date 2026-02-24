
// playwright.config.js
import { defineConfig } from '@playwright/test';


export default defineConfig({
  testDir: './src/tests/',
  fullyParallel: true,
  reporter: 'html',
  use: {
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
  },

});