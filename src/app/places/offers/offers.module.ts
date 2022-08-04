import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {OffersPage} from './offers.page';
import {RouterModule} from '@angular/router';
import {OfferItemComponent} from "./offer-item/offer-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: OffersPage }]),
  ],
  declarations: [OffersPage, OfferItemComponent]
})
export class OffersPageModule {
}
