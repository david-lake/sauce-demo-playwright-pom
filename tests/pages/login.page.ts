import { Page } from '@playwright/test';
import type { User } from '@data/users';

export class LoginPage {
  constructor(private page: Page) {}

  async visit() {
    await this.page.goto('/');
  }

  async login_as(user: User) {
    await this.page.getByPlaceholder('Username').fill(user.username);
    await this.page.getByPlaceholder('Password').fill(user.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}