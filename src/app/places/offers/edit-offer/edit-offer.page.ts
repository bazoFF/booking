import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlacesService} from "../../places.service";
import {LoadingController, NavController} from "@ionic/angular";
import {IPlace, IPlaceUpdate} from "../../places.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  public place: IPlace;
  public form: FormGroup;

  private _placeSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _placesService: PlacesService,
    private _navController: NavController,
    private _loadingController: LoadingController,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this._placeSub = this._placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
          this.place = place;
        });
      } else {
        this._navController.navigateBack('/places/tabs/offers');
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

    const dto: IPlaceUpdate = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
    };

    this._loadingController.create({
      message: 'Updating place...'
    }).then(element => {
      element.present().then();
      this._placesService.updatePlace(this.place.id, dto).subscribe(() => {
        element.dismiss().then();
        this.form.reset();
        this._router.navigate(['/places/tabs/offers']).then();
      });
    });
  }

  ngOnDestroy() {
    if (this._placeSub) {
      this._placeSub.unsubscribe();
    }
  }
}
