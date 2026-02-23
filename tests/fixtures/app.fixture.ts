import { test as base } from '@playwright/test';
import { App } from '@pages/app';

type AppFixture = {
  app: App;
};

export const test = base.extend<AppFixture>({
  app: async ({ page }, use) => {
    const app = new App(page);

    await use(app);
  },
});