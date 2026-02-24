import { expect } from '@playwright/test';
import { test } from '@fixtures/app.fixture';
import { users } from '@data/users';
import { products } from '@data/products';

test.describe('Cart', () => {
  test.beforeEach(async ({ app }) => {
    await app.login.visit();
    await app.login.loginAs(users.standard);
    await app.products.assertLoaded();
  });

  test('add single item to cart', async ({ app }) => {
    await app.products.addToCart(products.sauceLabsBackpack);
    await app.products.goToCart();
    
    await app.cart.assertLoaded();
    await app.cart.assertItemCount(1);
    await app.cart.assertItemInCart(products.sauceLabsBackpack);
  });

  test('add multiple items to cart', async ({ app }) => {
    await app.products.addToCart(products.sauceLabsBackpack);
    await app.products.addToCart(products.sauceLabsBikeLight);
    await app.products.addToCart(products.sauceLabsBoltTShirt);
    
    await app.products.goToCart();
    
    await app.cart.assertLoaded();
    await app.cart.assertItemCount(3);
    
    await expect.soft(app.cart.cartItems).toHaveCount(3);
    await app.cart.assertItemInCart(products.sauceLabsBackpack);
    await app.cart.assertItemInCart(products.sauceLabsBikeLight);
    await app.cart.assertItemInCart(products.sauceLabsBoltTShirt);
  });

  test('remove item from cart', async ({ app }) => {
    await app.products.addToCart(products.sauceLabsBackpack);
    await app.products.addToCart(products.sauceLabsBikeLight);
    await app.products.goToCart();
    
    await app.cart.assertItemCount(2);
    await app.cart.removeItem(products.sauceLabsBackpack);
    
    await app.cart.assertItemCount(1);
    await app.cart.assertItemNotInCart(products.sauceLabsBackpack);
    await app.cart.assertItemInCart(products.sauceLabsBikeLight);
  });

  test('remove all items from cart', async ({ app }) => {
    await app.products.addToCart(products.sauceLabsBackpack);
    await app.products.addToCart(products.sauceLabsBikeLight);
    await app.products.goToCart();
    
    await app.cart.assertItemCount(2);
    await app.cart.removeItem(products.sauceLabsBackpack);
    await app.cart.removeItem(products.sauceLabsBikeLight);
    
    await app.cart.assertCartEmpty();
  });

  test('cart persists across navigation', async ({ app }) => {
    await app.products.addToCart(products.sauceLabsBackpack);
    await app.products.goToCart();
    await app.cart.assertItemInCart(products.sauceLabsBackpack);
    
    await app.cart.returnToProducts();
    await app.products.assertLoaded();
    
    await app.products.goToCart();
    await app.cart.assertItemInCart(products.sauceLabsBackpack);
  });
});
