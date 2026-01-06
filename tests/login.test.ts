import test from '@playwright/test';
import expect  from '@playwright/test';


test('basic test', async ({ page }) => {
  await page.goto('/');
  const title = await page.locator('xpath=//div[@class=\'title\']').textContent();
  expect(title).toBe('Login');
});
