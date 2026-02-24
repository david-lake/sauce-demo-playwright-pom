import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  // Only expose locators used in tests
  readonly continueButton: Locator;

  constructor(private page: Page) {
    // Use getByRole for button - how users perceive it
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    // Use getByPlaceholder - matches visible hint text
    await this.page.getByPlaceholder('First Name').fill(firstName);
    await this.page.getByPlaceholder('Last Name').fill(lastName);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(postalCode);
  }

  async proceedToReview() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async completeOrder() {
    // Use getByRole for button action
    await this.page.getByRole('button', { name: 'Finish' }).click();
    await expect(this.page).toHaveURL(/checkout-complete/);
  }

  async cancelCheckout() {
    // Use getByRole for button action
    await this.page.getByRole('button', { name: 'Cancel' }).click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
    // Check for visible form header/label
    await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
  }

  async assertOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete/);
    // Use getByRole for heading - accessible and user-facing
    await expect(this.page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  }

  async assertErrorVisible(expectedMessage: string) {
    // Error messages are typically visible text
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
  }

  async assertItemTotal(expectedTotal: string) {
    // This might need testId as it's a computed value without clear user-facing label
    await expect(this.page.getByTestId('subtotal-label')).toContainText(expectedTotal);
  }
}
