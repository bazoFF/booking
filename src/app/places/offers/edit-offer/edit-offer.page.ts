import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlacesService} from "../../places.service";
import {NavController} from "@ionic/angular";
import {IPlace} from "../../places.model";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: IPlace;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navController: NavController
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this.place = this.placesService.getPlace(paramMap.get('placeId'));
      } else {
        this.navController.navigateBack('/places/tabs/offers');
      }
    });
  }
}
