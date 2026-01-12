import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const loginPage = process.env.loginPage || 'http://localhost:3000';
const email = process.env.email || '';
const password = process.env.password || '';






// простой тест на проверку наличия тайтла
/*
test('is Title on login page', async ({ page }) => {
const loginPage = process.env.loginPage || 'http://localhost:3000';
 await page.goto(loginPage);
  const title = await page.locator('xpath=//div[@class=\'title\']').textContent();
  expect(title).toBe('Login');
});
*/

// не пускает из-за клаудфларе
/*
test('login sucesses', async ({ page }) => {
 await page.goto(loginPage);
  await page.fill("xpath=//input[@formcontrolname='email']", email);
  await page.fill("xpath=//input[@formcontrolname='password']", password);
await page.waitForSelector('text="Успешно"', { state: 'visible' });

await page.click('text="Войти"');

const projects = await page.locator('xpath=//tbody/tr[@role="row"]');
await expect(projects.first()).toBeVisible();


});
*/


