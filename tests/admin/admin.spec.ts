/// <reference types="node" />
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { LoginHelper } from '../../helpers/loginHelper';
import { AdminRoomsPage } from '../../pages/adminRoomsPage';


const adminUsername: string = process.env.ADMIN_USERNAME!;
const adminPassword: string = process.env.ADMIN_PASSWORD!;

let loginPage: LoginPage;
let loginHelper: LoginHelper;
let adminRooms: AdminRoomsPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  loginHelper = new LoginHelper(page);
  adminRooms = new AdminRoomsPage(page);

});

test.describe('Admin - Room Management', () => {
test.describe.configure({ mode: 'serial' });

test('Create a new booking', async ({ page }) => {
  await loginHelper.quickLogin(adminUsername, adminPassword, '/admin');
  await expect(page).toHaveURL('/admin/rooms', {timeout: 10000});

  await adminRooms.roomName.fill('105');
  await adminRooms.roomPrice.fill('20');
  await adminRooms.wifiCheckbox.check();
  await adminRooms.refreshmentDiv.click();
  await adminRooms.tvCheckbox.check();
  await adminRooms.safeCheckbox.check();
  await adminRooms.radioDiv.click();
  await adminRooms.viewsCheckbox.check();
  await adminRooms.createButton.click();
})

test('Update a booking', async ({ page }) => {
  await loginHelper.quickLogin(adminUsername, adminPassword, '/admin');
  await expect(page).toHaveURL('/admin/rooms', {timeout: 10000});

  await adminRooms.roomListing.filter({ hasText: '105' }).click();
  await expect(adminRooms.headingRoom).toHaveText('Room: 105');
  await adminRooms.editButton.click();
  await adminRooms.typeSelect.selectOption('Family');
  await adminRooms.accessibleSelect.selectOption('true');
  await adminRooms.roomPriceInput.fill('30');
  await adminRooms.descriptionInput.fill('This is a family room with accessibility features.');
  await adminRooms.updateButton.click();
});

test('Remove a booking', async ({ page }) => {
  await loginHelper.quickLogin(adminUsername, adminPassword, '/admin');
  await expect(page).toHaveURL('/admin/rooms', {timeout: 10000});

  await adminRooms.roomDelete.nth(3).click();

})
});