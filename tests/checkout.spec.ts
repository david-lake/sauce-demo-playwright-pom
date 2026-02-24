import { expect } from '@playwright/test';
import { test } from '@fixtures/app.fixture';
import { users } from '@data/users';
import { products } from '@data/products';

test.describe('Checkout', () => {
  test.beforeEach(async ({ app }) => {
    await app.login.visit();
    await app.login.loginAs(users.standard);
    await app.products.assertLoaded();
    
    await app.products.addToCart(products.sauceLabsBackpack);
    await app.products.goToCart();
    await app.cart.proceedToCheckout();
    await app.checkout.assertLoaded();
  });

  test('complete checkout flow', async ({ app }) => {
    await app.checkout.fillShippingInfo('John', 'Doe', '12345');
    await app.checkout.proceedToReview();
    
    await app.checkout.assertItemTotal(products.sauceLabsBackpack.price);
    
    await app.checkout.completeOrder();
    await app.checkout.assertOrderComplete();
  });

  test('cancel checkout returns to cart', async ({ app }) => {
    await app.checkout.cancelCheckout();
    await app.cart.assertItemInCart(products.sauceLabsBackpack);
  });

  test('missing first name shows error', async ({ app }) => {
    await app.checkout.fillShippingInfo('', 'Doe', '12345');
    await app.checkout.continueButton.click();

    await app.checkout.assertErrorVisible('Error: First Name is required');
  });

  test('missing last name shows error', async ({ app }) => {
    await app.checkout.fillShippingInfo('John', '', '12345');
    await app.checkout.continueButton.click();

    await app.checkout.assertErrorVisible('Error: Last Name is required');
  });

  test('missing postal code shows error', async ({ app }) => {
    await app.checkout.fillShippingInfo('John', 'Doe', '');
    await app.checkout.continueButton.click();

    await app.checkout.assertErrorVisible('Error: Postal Code is required');
  });
});
