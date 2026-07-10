/// <reference types="node" />
// tests/bookings/rooms.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { LoginHelper } from '../../helpers/loginHelper';

let loginPage: LoginPage;
let loginHelper: LoginHelper;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  loginHelper = new LoginHelper(page);

});

test('Successfully book a room', async ({ page }) => {
await page.goto('/');
await page.getByRole('textbox').nth(1).click();
await page.getByRole('gridcell', { name: 'Choose Sunday, 12 July' }).click();
await page.getByRole('button', { name: 'Check Availability' }).click();
await page.getByRole('link', { name: 'Book now' }).nth(2).click();
await page.getByRole('button', { name: 'Reserve Now' }).click();
await page.getByRole('textbox', { name: 'Firstname' }).click();
await page.getByRole('textbox', { name: 'Firstname' }).fill('jack');
await page.getByRole('textbox', { name: 'Lastname' }).fill('black');
await page.getByRole('textbox', { name: 'Email' }).fill('jblack@test.com');
await page.getByRole('textbox', { name: 'Phone' }).fill('32216548451');
await page.getByRole('button', { name: 'Reserve Now' }).click();
})