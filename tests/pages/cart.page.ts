import { Page, Locator, expect } from '@playwright/test';
import type { Product } from '@data/products';

export class CartPage {
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;

  constructor(private page: Page) {
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = this.page.getByRole('button', { name: 'Go back' });
    this.cartItems = this.page.getByTestId('inventory-item');
    this.cartItemNames = this.page.getByTestId('inventory-item-name');
  }

  async visit() {
    await this.page.goto('/cart.html');
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    return this.cartItemNames.allTextContents();
  }

  async removeItem(product: Product) {
    await this.page.getByTestId(`remove-${product.slug}`).click();
  }

  async removeItemByIndex(index: number) {
    const removeButtons = this.page.getByRole('button', { name: 'Remove' });
    await removeButtons.nth(index).click();
  }

  async getItemPrice(product: Product): Promise<string> {
    const item = this.cartItems.filter({
      has: this.cartItemNames.filter({ hasText: product.name })
    });
    return (await item.getByTestId('inventory-item-price').textContent()) || '';
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  async returnToProducts() {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/inventory/);
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.page.getByTestId('title')).toHaveText('Your Cart');
  }

  async assertItemInCart(product: Product) {
    const item = this.cartItems.filter({
      has: this.cartItemNames.filter({ hasText: product.name })
    });
    await expect(item).toBeVisible();
  }

  async assertItemNotInCart(product: Product) {
    const item = this.cartItems.filter({
      has: this.cartItemNames.filter({ hasText: product.name })
    });
    await expect(item).toHaveCount(0);
  }

  async assertCartEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }

  async assertItemCount(expected: number) {
    await expect(this.cartItems).toHaveCount(expected);
  }
}
