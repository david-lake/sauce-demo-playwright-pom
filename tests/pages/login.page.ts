import { Page, expect } from '@playwright/test';
import type { User } from '@data/users';

export class LoginPage {
  constructor(private page: Page) {}

  async visit() {
    await this.page.goto('/');
  }

  async loginAs(user: User) {
    await this.page.getByPlaceholder('Username').fill(user.username);
    await this.page.getByPlaceholder('Password').fill(user.password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL('/');
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }

  async assertError() {
    await expect(this.page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  }
}