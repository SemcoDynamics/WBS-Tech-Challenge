/// <reference types="node" />
import { test, expect } from '../../fixtures/admin_fixtures';
import { gridCellLabelFor } from '../../helpers/dataHelper';
import { RoomAmenity } from '../../pages/adminRoomsPage';
import { RoomsPage } from '../../pages/rooms.page';

test.describe('Room Bookings', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Successfully book a room', async ({ page, adminCreateRoom }) => {
    const roomsPage = new RoomsPage(page);

    // Create a room using the adminCreateRoom fixture
    await adminCreateRoom({
      name: '104',
      price: '20',
      accessibility: true,
      amenities: [RoomAmenity.WIFI, RoomAmenity.TV],
    });

    // 1. Select Dates
    await page.goto('/');
    await roomsPage.openDatePicker();

    // Using your newly imported helper function
    const dateLabel = gridCellLabelFor(3);
    await roomsPage.selectDate(dateLabel);

    // 2. Check Availability and Initiate Booking
    await roomsPage.checkAvailabilityButton.click();
    await roomsPage.clickBookNowByDescription('Please enter a description for this room');
    await roomsPage.clickReserveNow();

    // 3. Fill Booking Form
    await roomsPage.fillGuestDetails('Jack', 'Black', 'jblack@test.com', '32216548453');

    // 4. Confirm Reservation
    await roomsPage.confirmReservation();

    // 5. Assertions & Evidence
    await expect(roomsPage.confirmationHeading).toBeVisible();
    await page.screenshot({ path: 'tests/screenshots/booking-confirmation.png', fullPage: true });
  });
});
