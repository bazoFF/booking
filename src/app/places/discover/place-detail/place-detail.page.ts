import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActionSheetController, ModalController, NavController} from "@ionic/angular";
import {PlacesService} from "../../places.service";
import {IPlace} from "../../places.model";
import {CreateBookingComponent} from "../../../bookings/create-booking/create-booking.component";

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: IPlace;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this.place = this.placesService.getPlace(paramMap.get('placeId'));
      } else {
        this.navController.navigateBack('/places/tabs/discover');
      }
    });
  }

  bookPlace() {
    this.actionSheetController.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select')
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetElement => {
      actionSheetElement.present().then();
    });

  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalController.create({
      component: CreateBookingComponent,
      componentProps: {
        place: this.place
      }
    }).then((modalElement) => {
      modalElement.present().then();
      return modalElement.onDidDismiss();
    }).then((result) => {
      console.log(result);
      if (result.role === 'confirm') {
        console.log('Booked!');
      }
    });
  }
}
