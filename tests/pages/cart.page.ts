import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async visit() {
    await this.page.goto('/cart.html');
  }

  async getItemCount(): Promise<number> {
    return this.page.getByTestId('inventory-item').count();
  }

  async getItemNames(): Promise<string[]> {
    const items = this.page.getByTestId('inventory-item-name');
    return items.allTextContents();
  }

  async removeItem(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async removeItemByIndex(index: number) {
    const removeButtons = this.page.getByRole('button', { name: 'Remove' });
    await removeButtons.nth(index).click();
  }

  async getItemPrice(productName: string): Promise<string> {
    const item = this.page.getByTestId('inventory-item').filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: productName })
    });
    return item.getByTestId('inventory-item-price').textContent() || '';
  }

  async clickCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async clickContinueShopping() {
    await this.page.getByRole('button', { name: 'Go back' }).click();
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.page.getByTestId('title')).toHaveText('Your Cart');
  }

  async assertItemInCart(productName: string) {
    const item = this.page.getByTestId('inventory-item').filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: productName })
    });
    await expect(item).toBeVisible();
  }

  async assertItemNotInCart(productName: string) {
    const item = this.page.getByTestId('inventory-item').filter({
      has: this.page.getByTestId('inventory-item-name').filter({ hasText: productName })
    });
    await expect(item).toHaveCount(0);
  }

  async assertCartEmpty() {
    await expect(this.page.getByTestId('inventory-item')).toHaveCount(0);
  }

  async assertItemCount(expected: number) {
    await expect(this.page.getByTestId('inventory-item')).toHaveCount(expected);
  }

  async assertCheckoutPage() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }
}
