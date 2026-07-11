import { Locator, Page } from '@playwright/test';

export class RoomsPage {
  readonly page: Page;
  readonly checkAvailabilityButton: Locator;
  readonly reserveNowButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly confirmationHeading: Locator;
  readonly dateInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateInput = page.getByRole('textbox').nth(1);
    this.checkAvailabilityButton = page.getByRole('button', { name: 'Check Availability' });
    this.reserveNowButton = page.getByRole('button', { name: 'Reserve Now' });
    this.firstNameInput = page.getByRole('textbox', { name: 'Firstname' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Lastname' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone' });
    this.confirmationHeading = page.getByRole('heading', { name: 'Booking Confirmed' });
  }

  async openDatePicker() {
    await this.dateInput.click();
  }

  async selectDate(label: string) {
    await this.page.getByRole('gridcell', { name: label }).click();
  }

  async clickBookNowByDescription(description: string) {
    await this.page.locator('.room-card').filter({ hasText: description }).getByRole('link', { name: 'Book now' }).click();
  }

  async clickReserveNow() {
    await this.reserveNowButton.click();
  }

  async fillGuestDetails(firstName: string, lastName: string, email: string, phone: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  async confirmReservation() {
    await this.page.getByRole('button', { name: 'Reserve Now', exact: true }).click();
  }
}
