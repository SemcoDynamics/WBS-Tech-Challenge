import { APIRequestContext, APIResponse } from '@playwright/test';

export class BookingController {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createToken(username: string, password: string): Promise<APIResponse> {
    return await this.request.post('/auth', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: { username, password },
    });
  }

  async getBookingIds(checkin?: string, checkout?: string): Promise<APIResponse> {
    const params: Record<string, string> = {};
    if (checkin) params.checkin = checkin;
    if (checkout) params.checkout = checkout;

    return await this.request.get('/booking', { params });
  }

  async getBooking(id: number | string): Promise<APIResponse> {
    return await this.request.get(`/booking/${id}`);
  }

  async createBooking(bookingData: object): Promise<APIResponse> {
    return await this.request.post('/booking', {
      data: bookingData,
    });
  }

  async updateBooking(
    id: number | string,
    bookingData: object,
    token: string,
  ): Promise<APIResponse> {
    return await this.request.put(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
        Accept: 'application/json',
      },
      data: bookingData,
    });
  }

  async partialUpdateBooking(
    id: number | string,
    partialData: object,
    token: string,
  ): Promise<APIResponse> {
    return await this.request.patch(`/booking/${id}`, {
      // Note: Restful-Booker typically uses PATCH for partials
      headers: {
        Cookie: `token=${token}`,
        Accept: 'application/json',
      },
      data: partialData,
    });
  }

  async deleteBooking(id: number | string, token: string): Promise<APIResponse> {
    return await this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }

  async healthCheck(): Promise<APIResponse> {
    return await this.request.get('/ping');
  }
}
