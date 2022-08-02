import { Injectable } from '@angular/core';
import {IBooking} from "./booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _bookings: IBooking[] = [
    {
      id: 'xyz',
      placeId: 'p1',
      placeTitle: 'Manhattan Mansion',
      guestNumber: 2,
      userId: 'abc'
    }
  ];

  get bookings() {
    return [...this._bookings];
  }

  constructor() { }
}
