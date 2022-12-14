import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from "../places.service";
import {IPlace} from "../places.model";
import { IonItemSliding, LoadingController } from "@ionic/angular";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  public offers: IPlace[];
  public isLoading: boolean;
  private _placesSub: Subscription;

  constructor(private placesService: PlacesService, private router: Router) {
  }

  ngOnInit() {
    this._placesSub = this.placesService.places.subscribe(places => {
      this.offers = places;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this._placesSub) {
      this._placesSub.unsubscribe();
    }
  }

  edit(offerId: string, itemSliding: IonItemSliding) {
    itemSliding.close().then();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]).then();
  }
}
