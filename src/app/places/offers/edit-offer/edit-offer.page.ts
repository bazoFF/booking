import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlacesService} from "../../places.service";
import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {IPlace, IPlaceUpdate} from "../../places.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {of, Subscription, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  public place: IPlace;
  public placeId: string;
  public form: FormGroup;
  public isLoading: boolean;

  private _placeSub: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _placesService: PlacesService,
    private _navController: NavController,
    private _loadingController: LoadingController,
    private _router: Router,
    private _alertController: AlertController
  ) {
  }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      if (paramMap.has('placeId')) {
        this.placeId = paramMap.get('placeId');
        this.isLoading = true;
        this._placeSub = this._placesService.getPlace(this.placeId).subscribe(place => {
          console.log('NOT ERROR');
          this.place = place;
          this._buildForm();
          this.isLoading = false;
        }, () => {
          console.log('ERROR');
          this._alertController.create({
            header: 'An error occurred!',
            message: 'Place could not be fetched. Please try again later.',
            buttons: [{
              text: 'Okay',
              handler: () => {
                this._router.navigate(['/places/tabs/offers']);
              }
            }]
          }).then(alert => {
            alert.present().then();
          })
        });
      } else {
        this._navController.navigateBack('/places/tabs/offers');
        return;
      }
    });

  }

  private _buildForm() {
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
