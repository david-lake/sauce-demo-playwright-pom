import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async assertLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.getByTestId('title')).toHaveText('Products');
  }
}