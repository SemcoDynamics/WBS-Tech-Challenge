import { APIRequestContext } from '@playwright/test';
import { BookingController } from '../controllers/bookingController';

export class ApiHelper {
  static async getAuthToken(request: APIRequestContext): Promise<string> {
    const bookingController = new BookingController(request);
    const response = await bookingController.createToken('admin', 'password123');
    
    // Check if response is successful
    if (!response.ok()) {
      const text = await response.text();
      throw new Error(`Auth failed with status ${response.status()}: ${text}`);
    }
    
    const body = await response.json();
    console.log('Auth response:', JSON.stringify(body, null, 2));
    return body.token;
  }
}