import {Component, Input, OnInit} from '@angular/core';
import {IPlace} from "../../places/places.model";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() place: IPlace;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  book() {
    this.modalController.dismiss({ message: 'This is a dummy message!' }, 'confirm').then();
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel').then();
  }

}
