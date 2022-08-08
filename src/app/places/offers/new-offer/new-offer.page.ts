import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlacesService} from "../../places.service";
import {IPlaceCreate} from "../../places.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form: FormGroup;

  constructor(private _placesService: PlacesService, private _router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { updateOn: 'blur', validators: [Validators.required] }),
      description: new FormControl(null, { updateOn: 'blur', validators: [Validators.required,
         Validators.maxLength(180)] }),
      price: new FormControl(null, {
        updateOn: 'blur', validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  createOffer() {
    if (this.form.invalid) {
      return;
    }

    const dto: IPlaceCreate = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      price: +this.form.get('price').value,
      availableFrom: new Date(this.form.get('dateFrom').value),
      availableTo: new Date(this.form.get('dateTo').value),
    };

    this._placesService.addPlace(dto);

    this.form.reset();
    this._router.navigate(['/places/tabs/offers']).then();
  }
}
