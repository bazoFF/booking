import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookingService} from "./booking.service";
import {IBooking} from "./booking";
import {IonItemSliding, LoadingController} from "@ionic/angular";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  public bookings: IBooking[];
  private _bookingsSub: Subscription;

  constructor(private bookingService: BookingService, private _loadingController: LoadingController) { }

  ngOnInit() {
    this._bookingsSub = this.bookingService.bookings.subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  ngOnDestroy() {
    if (this._bookingsSub) {
      this._bookingsSub.unsubscribe();
    }
  }

  cancel(bookingId: string, itemSliding: IonItemSliding) {
    itemSliding.close().then();
    this._loadingController.create({
      message: 'Cancelling...'
    }).then(element => {
      element.present().then();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        element.dismiss().then();
      });
    });
  }
}
