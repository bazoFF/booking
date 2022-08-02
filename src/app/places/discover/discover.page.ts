import { Component, OnInit } from '@angular/core';
import {PlacesService} from "../places.service";
import {IPlace} from "../places.model";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  places: IPlace[];
  placesForList: IPlace[];

  constructor(private placesService: PlacesService, private menuController: MenuController) { }

  ngOnInit() {
    this.places = this.placesService.places;
    this.placesForList = this.places.slice(1);
  }
}
