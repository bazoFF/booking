import {Component, Input, OnInit} from '@angular/core';
import {IPlace} from "../../places.model";

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {

  @Input() public offer: IPlace;

  constructor() { }

  ngOnInit() {}

  public getDummyDate() {
    return new Date();
  }
}
