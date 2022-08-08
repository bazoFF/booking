import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IPlace} from "../../places/places.model";
import {ModalController} from "@ionic/angular";
import {FormGroup, NgForm} from "@angular/forms";
import {IBookingStartCreate} from "../booking";

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() place: IPlace;
  @Input() mode: 'select' | 'random';
  @ViewChild('form', { static: true }) form: NgForm;

  startDate: string;
  endDate: string;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    if (this.mode === 'random') {
      this._generateRandomDates();
    }
  }

  book() {
    if (this.form.invalid || !this.datesIsValid) {
      return;
    }

    const dto: IBookingStartCreate = {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: +this.form.value['guest-number'],
      dateFrom: new Date(this.form.value['date-from']),
      dateTo: new Date(this.form.value['date-to']),
    };

    this.modalController.dismiss(dto, 'confirm').then();
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel').then();
  }

  private _generateRandomDates() {
    const availableFrom = new Date(this.place.availableFrom);
    const availableTo = new Date(this.place.availableTo);

    const startTimestamp = availableFrom.getTime() + Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime());
    const endTimestamp = startTimestamp + Math.random() + 6 * 24 * 60 * 60 * 1000;

    this.startDate = new Date(startTimestamp).toISOString();
    this.endDate = new Date(endTimestamp).toISOString();
  }

  get datesIsValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return startDate < endDate;
  }
}
