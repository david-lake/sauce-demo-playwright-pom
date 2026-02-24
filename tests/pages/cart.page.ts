import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  // Locators exposed for test flexibility
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

  async removeItem(productName: string) {
    const slug = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async removeItemByIndex(index: number) {
    const removeButtons = this.page.getByRole('button', { name: 'Remove' });
    await removeButtons.nth(index).click();
  }

  async getItemPrice(productName: string): Promise<string> {
    const item = this.cartItems.filter({
      has: this.cartItemNames.filter({ hasText: productName })
    });
    return item.getByTestId('inventory-item-price').textContent() || '';
  }

  // Meaningful action: proceed through entire checkout initiation flow
  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

  // Meaningful action: return to products and verify we're there
  async returnToProducts() {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/inventory/);
  }

  // Assertions
  async assertLoaded() {
    await expect(this.page).toHaveURL(/cart/);
    await expect(this.page.getByTestId('title')).toHaveText('Your Cart');
  }

  async assertItemInCart(productName: string) {
    const item = this.cartItems.filter({
      has: this.cartItemNames.filter({ hasText: productName })
    });
    await expect(item).toBeVisible();
  }

  async assertItemNotInCart(productName: string) {
    const item = this.cartItems.filter({
      has: this.cartItemNames.filter({ hasText: productName })
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
