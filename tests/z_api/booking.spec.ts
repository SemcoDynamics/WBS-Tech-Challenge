import { test, expect } from '@playwright/test';
import { BookingController } from '../../controllers/bookingController';
import { ApiHelper } from '../../helpers/apiHelper';

test.describe('Restful Booker API - E2E Testing Suite', () => {
  let bookingController: BookingController;
  let authToken: string;
  let sharedBookingId: number;

  // Mock Data Generators for DRY principles
  const validBookingData = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-07-01',
      checkout: '2026-07-30'
    },
    additionalneeds: 'Breakfast'
  };

  test.beforeAll(async ({ playwright }) => {
    // Isolated request context targeting API base url
    const requestContext = await playwright.request.newContext({
      baseURL: 'https://restful-booker.herokuapp.com/'
    });
    bookingController = new BookingController(requestContext);
    
    // Authenticate once for the stateful flows (Update/Delete)
    authToken = await ApiHelper.getAuthToken(requestContext);
  });

  test('Health Check - Verify API availability', async () => {
    const response = await bookingController.healthCheck();
    expect(response.status()).toBe(201); // Restful-Booker returns 201 Created for /ping
  });

  test('Positive: End to End - Complete Booking Lifecycle (Create -> Get -> Update -> Delete)', async () => {
    // 1. CREATE BOOKING
    const createRes = await bookingController.createBooking(validBookingData);
    expect(createRes.status()).toBe(200);
    
    const createBody = await createRes.json();
    expect(createBody).toHaveProperty('bookingid');
    sharedBookingId = createBody.bookingid; 
    expect(createBody.booking.firstname).toBe('Jim');

    // 2. GET BOOKING BY ID
    const getRes = await bookingController.getBooking(sharedBookingId);
    expect(getRes.status()).toBe(200);
    const getBody = await getRes.json();
    expect(getBody.lastname).toBe('Brown');

    // 3. FULL UPDATE (PUT)
    const updatedData = { ...validBookingData, firstname: 'James' };
    const updateRes = await bookingController.updateBooking(sharedBookingId, updatedData, authToken);
    expect(updateRes.status()).toBe(200);
    const updateBody = await updateRes.json();
    expect(updateBody.firstname).toBe('James');

    // 4. DELETE BOOKING
    const deleteRes = await bookingController.deleteBooking(sharedBookingId, authToken);
    expect(deleteRes.status()).toBe(201); // Restful-Booker returns 201 for deletions
    
    // 5. VERIFY DELETED
    const verifyDeleted = await bookingController.getBooking(sharedBookingId);
    expect(verifyDeleted.status()).toBe(404);
  });

  test('Positive: Filter bookings by query parameters', async () => {
    const response = await bookingController.getBookingIds('2026-07-01', '2026-07-30');
    expect(response.status()).toBe(200);
    const ids = await response.json();
    expect(Array.isArray(ids)).toBeTruthy();
  });

  test('Negative: Prevent updating a booking with an invalid/expired token', async () => {
    // Create temporary booking to attempt exploit
    const createRes = await bookingController.createBooking(validBookingData);
    const tempBody = await createRes.json();
    const targetId = tempBody.bookingid;

    const exploitData = { ...validBookingData, firstname: 'Hacker' };
    const badResponse = await bookingController.updateBooking(targetId, exploitData, 'invalidToken123');
    
    // Assert security boundary holds
    expect(badResponse.status()).toBe(403); // Forbidden
  });

  test('Negative: Return 404 for fetching non-existent booking ID', async () => {
    const invalidId = 99999999;
    const response = await bookingController.getBooking(invalidId);
    expect(response.status()).toBe(404);
  });
});