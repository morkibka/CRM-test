import  {defineConfig}  from '@playwright/test';



export default defineConfig({
  testDir: './src/tests',
  use: {
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
});
