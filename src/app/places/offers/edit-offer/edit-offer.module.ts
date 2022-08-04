import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {EditOfferPage} from './edit-offer.page';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: EditOfferPage }]),
  ],
  declarations: [EditOfferPage]
})
export class EditOfferPageModule {
}
