import  defineConfig  from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();


export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',

    loginURL: process.env.loginPage || 'http://localhost:3000',
  },
});
