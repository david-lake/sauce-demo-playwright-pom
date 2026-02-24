import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  // Only expose locators used in tests or multiple methods
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.continueButton = this.page.getByTestId('continue');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByTestId('firstName').fill(firstName);
    await this.page.getByTestId('lastName').fill(lastName);
    await this.page.getByTestId('postalCode').fill(postalCode);
  }

  async proceedToReview() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async completeOrder() {
    await this.page.getByTestId('finish').click();
    await expect(this.page).toHaveURL(/checkout-complete/);
  }

  async cancelCheckout() {
    await this.page.getByTestId('cancel').click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
    await expect(this.page.getByTestId('firstName')).toBeVisible();
  }

  async assertOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  }

  async assertErrorVisible(expectedMessage: string) {
    await expect(this.page.getByTestId('error')).toBeVisible();
    await expect(this.page.getByTestId('error')).toHaveText(expectedMessage);
  }

  async assertItemTotal(expectedTotal: string) {
    await expect(this.page.getByTestId('subtotal-label')).toContainText(expectedTotal);
  }
}
