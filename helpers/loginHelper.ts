import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

export class LoginHelper {
  readonly page: Page;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async quickLogin(username: string, password: string, url: string): Promise<void> {
    await this.loginPage.login(username, password, url);
  }
}