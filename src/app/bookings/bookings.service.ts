import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private _bookings: Booking[] = [
    {
      id: 'xyz',
      placeId: 'p1',
      placeTitle: 'First place',
      gestNumber: 2,
      userId: 'abc'

    }
  ];

  constructor() { }

  get getBookings() {
    return [...this._bookings]
  }
}
