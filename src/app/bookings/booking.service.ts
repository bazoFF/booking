import { Injectable } from '@angular/core';
import {IBooking, IBookingCreate} from "./booking";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {delay, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private _bookings: BehaviorSubject<IBooking[]>  =  new BehaviorSubject<IBooking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(private _authService: AuthService) { }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
      this._bookings.next(bookings.filter(booking => booking.id !== bookingId));
    }));
  }

  addBooking(dto: IBookingCreate) {
    const booking: IBooking = {
      id: Math.random().toString(),
      userId: this._authService.userId,
      placeId: dto.placeId,
      placeTitle: dto.placeTitle,
      placeImage: dto.placeImage,
      firstName: dto.firstName,
      lastName: dto.lastName,
      guestNumber: dto.guestNumber,
      bookedFrom: dto.dateFrom,
      bookedTo: dto.dateTo
    };

    return this.bookings.pipe(take(1), delay(1000), tap(bookings => {
      this._bookings.next(bookings.concat(booking));
    }));
  }
}
