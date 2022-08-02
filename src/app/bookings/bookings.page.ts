import { Component, OnInit } from '@angular/core';
import {BookingService} from "./booking.service";
import {IBooking} from "./booking";
import {IonItemSliding} from "@ionic/angular";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  bookings: IBooking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookings = this.bookingService.bookings;
  }

  cancel(offerId: string, itemSliding: IonItemSliding) {
    itemSliding.close().then();
  }
}
