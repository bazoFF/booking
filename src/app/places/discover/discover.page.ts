import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from "../places.service";
import {IPlace} from "../places.model";
import {MenuController, SegmentChangeEventDetail} from "@ionic/angular";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  public places: IPlace[];
  public placesForList: IPlace[];
  public relevantPlaces: IPlace[];
  public isLoading: boolean;
  private _placesSub: Subscription;

  constructor(private placesService: PlacesService, private menuController: MenuController, private authService: AuthService) { }

  ngOnInit() {
    this._placesSub = this.placesService.places.subscribe(places => {
      this.places = places;
      this.relevantPlaces = this.places;
      this.placesForList = this.relevantPlaces.slice(1);
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

  filter(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.places;
      this.placesForList = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.places.filter((place) => place.userId !== this.authService.userId);
      this.placesForList = this.relevantPlaces.slice(1);
    }
  }
}
