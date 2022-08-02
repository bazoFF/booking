import { Component, OnInit } from '@angular/core';
import {IPlace} from "../../places.model";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {PlacesService} from "../../places.service";

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

  place: IPlace;

  constructor(private route: ActivatedRoute, private navController: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this.place = this.placesService.getPlace( paramMap.get('placeId'));
      } else {
        this.navController.navigateBack('/places/tabs/offers');
      }
    });
  }
}
