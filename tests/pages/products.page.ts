import { Page, expect } from '@playwright/test';
import type { Product } from '@data/products';

export class ProductsPage {
  constructor(private page: Page) {}

  async assertLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page.getByTestId('title')).toHaveText('Products');
  }

  async addToCart(product: Product) {
    await this.page.getByTestId(`add-to-cart-${product.slug}`).click();
  }

  async removeFromCart(product: Product) {
    await this.page.getByTestId(`remove-${product.slug}`).click();
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
