import { Page } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { ProductsPage } from '@pages/products.page';

export class App {
  login: LoginPage;
  products: ProductsPage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
    this.products = new ProductsPage(page);
  }
}