import {Component, OnInit} from '@angular/core';
import {PlacesService} from "../places.service";
import {IPlace} from "../places.model";
import {IonItemSliding} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  offers: IPlace[];

  constructor(private placesService: PlacesService, private router: Router) {
  }

  ngOnInit() {
    this.offers = this.placesService.places;
  }

  edit(offerId: string, itemSliding: IonItemSliding) {
    itemSliding.close().then();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]).then();
  }
}
