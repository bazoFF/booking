import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from "../places.service";
import {IPlace} from "../places.model";
import {MenuController, SegmentChangeEventDetail} from "@ionic/angular";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  places: IPlace[];
  placesForList: IPlace[];
  private _placesSub: Subscription;

  constructor(private placesService: PlacesService, private menuController: MenuController) { }

  ngOnInit() {
    this._placesSub = this.placesService.places.subscribe(places => {
      this.places = places;
      this.placesForList = this.places.slice(1);
    });
  }

  ngOnDestroy() {
    if (this._placesSub) {
      this._placesSub.unsubscribe();
    }
  }

  filter(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
}
