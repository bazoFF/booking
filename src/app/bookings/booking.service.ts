import {Injectable} from '@angular/core';
import {IBooking, IBookingCreate} from "./booking";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {delay, map, switchMap, take, tap} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _entity = 'bookings';
  private _postFixURL = '.json';
  private _bookings: BehaviorSubject<IBooking[]> = new BehaviorSubject<IBooking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(private _authService: AuthService, private _http: HttpClient) {
  }

  cancelBooking(bookingId: string) {
    return this._http.delete(`${env.api}/${this._entity}/${bookingId}${this._postFixURL}`)
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          this._bookings.next(bookings.filter(booking => booking.id !== bookingId));
        })
      );
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

    return this._http.post<{ name: string }>(`${env.api}/${this._entity}${this._postFixURL}`, {...booking, id: null})
      .pipe(
        switchMap((result) => {
          booking.id = result.name;
          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          this._bookings.next(bookings.concat(booking));
        })
      );
  }

  fetchBookings() {
    return this._http.get<{[key: string]: IBooking}>(`${env.api}/${this._entity}${this._postFixURL}?orderBy="userId"&equalTo="${this._authService.userId}"`)
      .pipe(
        map(result => {
          const bookings = [];
          for(const key in result) {
            if (result.hasOwnProperty(key)) {
              bookings.push({
                ...result[key],
                id: key
              });
            }
          }
          return bookings;
        }),
        tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }
}
