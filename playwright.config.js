// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  retries: 0,

  use: {
    trace: 'on-first-retry',
    slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : 0,
    headless: process.env.HEADLESS ? process.env.HEADLESS === 'false' : false,
    viewport: null, // ✅ allows real OS window size
  },

  timeout: 60 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null, // ✅ keeps full-screen behavior
        headless: false,
        launchOptions: {
          args: ['--start-maximized'] // ✅ opens browser maximized
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 }, // fallback viewport
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 }, // fallback viewport
      },
    },
  ],
});
