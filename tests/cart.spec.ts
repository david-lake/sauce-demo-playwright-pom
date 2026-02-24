import { expect } from '@playwright/test';
import { test } from '@fixtures/app.fixture';
import { users } from '@data/users';

test.describe('Cart', () => {
  test.beforeEach(async ({ app }) => {
    await app.login.visit();
    await app.login.loginAs(users.standard);
    await app.products.assertLoaded();
  });

  test('add single item to cart', async ({ app }) => {
    await app.products.addToCart('Sauce Labs Backpack');
    await app.products.goToCart();
    
    await app.cart.assertLoaded();
    await app.cart.assertItemCount(1);
    await app.cart.assertItemInCart('Sauce Labs Backpack');
  });

  test('add multiple items to cart', async ({ app }) => {
    await app.products.addToCart('Sauce Labs Backpack');
    await app.products.addToCart('Sauce Labs Bike Light');
    await app.products.addToCart('Sauce Labs Bolt T-Shirt');
    
    await app.products.goToCart();
    
    await app.cart.assertLoaded();
    await app.cart.assertItemCount(3);
    
    // Use soft assertions to check all items in one go
    await expect.soft(app.cart['page'].getByTestId('inventory-item')).toHaveCount(3);
    await app.cart.assertItemInCart('Sauce Labs Backpack');
    await app.cart.assertItemInCart('Sauce Labs Bike Light');
    await app.cart.assertItemInCart('Sauce Labs Bolt T-Shirt');
  });

  test('remove item from cart', async ({ app }) => {
    await app.products.addToCart('Sauce Labs Backpack');
    await app.products.addToCart('Sauce Labs Bike Light');
    await app.products.goToCart();
    
    await app.cart.assertItemCount(2);
    await app.cart.removeItem('Sauce Labs Backpack');
    
    await app.cart.assertItemCount(1);
    await app.cart.assertItemNotInCart('Sauce Labs Backpack');
    await app.cart.assertItemInCart('Sauce Labs Bike Light');
  });

  test('remove all items from cart', async ({ app }) => {
    await app.products.addToCart('Sauce Labs Backpack');
    await app.products.addToCart('Sauce Labs Bike Light');
    await app.products.goToCart();
    
    await app.cart.assertItemCount(2);
    await app.cart.removeItem('Sauce Labs Backpack');
    await app.cart.removeItem('Sauce Labs Bike Light');
    
    await app.cart.assertCartEmpty();
  });

  test('cart persists across navigation', async ({ app }) => {
    await app.products.addToCart('Sauce Labs Backpack');
    await app.products.goToCart();
    await app.cart.assertItemInCart('Sauce Labs Backpack');
    
    await app.cart.clickContinueShopping();
    await app.products.assertLoaded();
    
    await app.products.goToCart();
    await app.cart.assertItemInCart('Sauce Labs Backpack');
  });

  test('continue shopping returns to products', async ({ app }) => {
    await app.products.addToCart('Sauce Labs Backpack');
    await app.products.goToCart();
    
    await app.cart.clickContinueShopping();
    await app.products.assertLoaded();
  });

  test('click checkout navigates to checkout page', async ({ app }) => {
    await app.products.addToCart('Sauce Labs Backpack');
    await app.products.goToCart();
    
    await app.cart.clickCheckout();
    await app.cart.assertCheckoutPage();
  });
});
