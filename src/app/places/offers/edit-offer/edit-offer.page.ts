import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlacesService} from "../../places.service";
import {NavController} from "@ionic/angular";
import {IPlace} from "../../places.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: IPlace;
  form: FormGroup;

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
        return;
      }
    });
    this.form = new FormGroup<any>({
      title: new FormControl(this.place.title, { updateOn: 'blur', validators: [Validators.required] }),
      description: new FormControl(this.place.description, { updateOn: 'blur', validators: [Validators.required,
          Validators.maxLength(180)] })
    });
  }

  editOffer() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
  }
}
