import { Page, Locator } from '@playwright/test';

export enum RoomAmenity {
  WIFI = 'WiFi',
  REFRESHMENTS = 'Refreshments',
  TV = 'TV',
  SAFE = 'Safe',
  RADIO = 'Radio',
  VIEWS = 'Views',
}

export class AdminRoomsPage {
  readonly page: Page;
  readonly roomName: Locator;
  readonly roomPrice: Locator;
  readonly wifiCheckbox: Locator;
  readonly refreshmentDiv: Locator;
  readonly tvCheckbox: Locator;
  readonly safeCheckbox: Locator;
  readonly radioDiv: Locator;
  readonly viewsCheckbox: Locator;
  readonly createButton: Locator;
  readonly roomListing: Locator;
  readonly headingRoom: Locator;
  readonly editButton: Locator;
  readonly typeSelect: Locator;
  readonly accessibleSelect: Locator;
  readonly roomPriceInput: Locator;
  readonly descriptionInput: Locator;
  readonly updateButton: Locator;
  readonly roomDelete: Locator;
  readonly accessibleLocator: Locator;
  readonly imageInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.roomName = page.getByTestId('roomName');
    this.roomPrice = page.locator('#roomPrice');
    this.wifiCheckbox = page.getByRole('checkbox', { name: 'WiFi' });
    this.refreshmentDiv = page
      .locator('div')
      .filter({ hasText: /^Refreshments$/ })
      .nth(1);
    this.tvCheckbox = page.getByRole('checkbox', { name: 'TV' });
    this.safeCheckbox = page.getByRole('checkbox', { name: 'Safe' });
    this.radioDiv = page
      .locator('div')
      .filter({ hasText: /^Radio$/ })
      .nth(1);
    this.viewsCheckbox = page.getByRole('checkbox', { name: 'Views' });
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.roomListing = page.getByTestId('roomlisting');
    this.headingRoom = page.getByRole('heading', { name: 'Room:' });
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.typeSelect = page.getByLabel('Type:');
    this.accessibleSelect = page.getByLabel('Accessible:');
    this.accessibleLocator = page.locator('#accessible');
    this.roomPriceInput = page.getByRole('textbox', { name: 'Room price:' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.updateButton = page.getByRole('button', { name: 'Update' });
    this.roomDelete = page.locator('.roomDelete');
    this.imageInput = page.getByRole('textbox', { name: 'Image:' });
  }

  async setAccessibleOption(option: string) {
    await this.accessibleSelect.selectOption(option);
  }
}
