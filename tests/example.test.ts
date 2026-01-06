import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const title = await page.textContent('.navbar__title');
  expect(title).toBe('Playwright');
});
