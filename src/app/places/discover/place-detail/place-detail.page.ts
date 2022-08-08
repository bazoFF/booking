import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActionSheetController, LoadingController, ModalController, NavController} from "@ionic/angular";
import {PlacesService} from "../../places.service";
import {IPlace} from "../../places.model";
import {CreateBookingComponent} from "../../../bookings/create-booking/create-booking.component";
import {Subscription} from "rxjs";
import {BookingService} from "../../../bookings/booking.service";
import {IBookingCreate, IBookingStartCreate} from "../../../bookings/booking";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place: IPlace;
  isBookable: boolean;
  private _placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private _bookingsService: BookingService,
    private _loadingController: LoadingController,
    private _authService: AuthService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this._placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
          this.place = place;
          this.isBookable = place.userId !== this._authService.userId;
        });
      } else {
        this.navController.navigateBack('/places/tabs/discover');
      }
    });
  }

  ngOnDestroy() {
    if (this._placeSub) {
      this._placeSub.unsubscribe();
    }
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
        place: this.place,
        mode: mode
      }
    }).then((modalElement) => {
      modalElement.present().then();
      return modalElement.onDidDismiss();
    }).then((result) => {
      const startDto: IBookingStartCreate = result.data;

      if (result.role === 'confirm') {
        this._loadingController.create({
          message: 'Booking place...'
        }).then(element => {
          element.present().then();const dto: IBookingCreate = {
            placeId: this.place.id,
            placeTitle: this.place.title,
            placeImage: this.place.imageURL,
            ...startDto
          };

          this._bookingsService.addBooking(dto).subscribe(() => {
            element.dismiss().then();
          });
        });
      }
    });
  }
}
