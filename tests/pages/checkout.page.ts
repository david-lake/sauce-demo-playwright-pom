import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly itemTotal: Locator;

  constructor(private page: Page) {
    this.firstNameInput = this.page.getByTestId('firstName');
    this.lastNameInput = this.page.getByTestId('lastName');
    this.postalCodeInput = this.page.getByTestId('postalCode');
    this.continueButton = this.page.getByTestId('continue');
    this.cancelButton = this.page.getByTestId('cancel');
    this.finishButton = this.page.getByTestId('finish');
    this.errorMessage = this.page.getByTestId('error');
    this.itemTotal = this.page.getByTestId('subtotal-label');
  }

  async fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async proceedToReview() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async completeOrder() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL(/checkout-complete/);
  }

  async cancelCheckout() {
    await this.cancelButton.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one/);
    await expect(this.firstNameInput).toBeVisible();
  }

  async assertOnReviewStep() {
    await expect(this.page).toHaveURL(/checkout-step-two/);
  }

  async assertOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete/);
    await expect(this.page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  }

  async assertErrorVisible(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  async assertItemTotal(expectedTotal: string) {
    await expect(this.itemTotal).toContainText(expectedTotal);
  }
}
