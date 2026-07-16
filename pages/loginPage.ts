// pages/LoginPage.ts
import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly adminLink: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminLink = page.getByRole('link', { name: 'Admin', exact: true });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async login(username: string, password: string, url: string) {
    await this.page.goto(url);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
