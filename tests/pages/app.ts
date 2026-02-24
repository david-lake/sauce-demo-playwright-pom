import { Page } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { ProductsPage } from '@pages/products.page';
import { CartPage } from '@pages/cart.page';

export class App {
  login: LoginPage;
  products: ProductsPage;
  cart: CartPage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.products = new ProductsPage(page);
    this.cart = new CartPage(page);
  }
}
