import { test as base } from '@playwright/test';
import { AdminRoomsPage } from '../pages/adminRoomsPage';
import { LoginHelper } from '../helpers/loginHelper';

type AdminCreateParams = {
  name?: string;
  price?: string;
  accessibility?: boolean;
  amenities?: string[];
};

export const test = base.extend<{ adminCreateRoom: (opts?: AdminCreateParams) => Promise<void> }>({
  adminCreateRoom: async ({ page }, use) => {
    const loginHelper = new LoginHelper(page);
    const adminRooms = new AdminRoomsPage(page);

    await use(async (opts: AdminCreateParams = {}) => {
      const {
        name = '104',
        price = '20',
        accessibility = true,
        amenities = ['WiFi', 'Refreshments', 'TV', 'Safe', 'Radio', 'Views'],
      } = opts;
      await loginHelper.quickLogin(
        process.env.ADMIN_USERNAME!,
        process.env.ADMIN_PASSWORD!,
        '/admin',
      );
      await expect(page).toHaveURL('/admin/rooms', { timeout: 10000 });
      await adminRooms.roomName.fill(name);
      await adminRooms.accessibleLocator.selectOption(accessibility ? 'true' : 'false');
      await adminRooms.roomPrice.fill(price);
      for (const a of amenities) {
        if (a === 'Refreshments' || a === 'Radio') {
          await adminRooms.page
            .locator('div')
            .filter({ hasText: new RegExp(`^${a}$`) })
            .nth(1)
            .click();
        } else {
          await adminRooms.page.getByRole('checkbox', { name: a }).check();
        }
      }
      await adminRooms.createButton.click();
    });
  },
});

export const expect = test.expect;
