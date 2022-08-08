import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPlace} from "../../places.model";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {PlacesService} from "../../places.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {

  place: IPlace;
  private _placeSub: Subscription;
  constructor(private route: ActivatedRoute, private navController: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this._placeSub = this.placesService.getPlace( paramMap.get('placeId')).subscribe(place => {
          this.place = place;
        });
      } else {
        this.navController.navigateBack('/places/tabs/offers');
      }
    });
  }

  ngOnDestroy() {
    if (this._placeSub) {
      this._placeSub.unsubscribe();
    }
  }
}
