import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async assertLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.getByTestId('title')).toHaveText('Products');
  }

  async addToCart(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.getByTestId(`add-to-cart-${slug}`).click();
  }

  async removeFromCart(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async goToCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.page.getByTestId('shopping-cart-badge');
    if (await badge.isVisible().catch(() => false)) {
      return parseInt(await badge.textContent() || '0', 10);
    }
    return 0;
  }
}
