import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
  }

  async proceedToReview() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async completeOrder() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
    await expect(this.page).toHaveURL(/checkout-complete/);
  }

  async cancelCheckout() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
  }

  async assertOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  }

  async assertErrorVisible(expectedMessage: string) {
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
  }

  async assertItemTotal(expectedTotal: string) {
    await expect(this.page.getByTestId('subtotal-label')).toContainText(expectedTotal);
  }
}
