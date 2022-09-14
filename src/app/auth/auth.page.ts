import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { LoadingController, ModalController } from "@ionic/angular";
import { NgForm } from "@angular/forms";
import { Contacts } from "@capacitor-community/contacts";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";
import { CameraPreview } from "@capacitor-community/camera-preview";
import { CameraComponent } from "./components/camera/camera.component";
import { ContactsComponent } from "./components/contacts/contacts.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public isLoading: boolean;
  public isSignup: boolean;
  public isRecording: boolean;
  public imgSrc: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private _permissionsService: AndroidPermissions,
    private _modalController: ModalController
  ) {
  }

  get modeName() {
    return this.isSignup ? 'login' : 'signup';
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
    console.log('submit', form);
    if (form.invalid) {
      return;
    }

    console.log(form.value);

    if (this.isSignup) {
      // Send a request to signup servers
    } else {
      // Send a request to login servers
      this._login()
    }
  }

  switchAuthMode() {
    console.log('switchAuthMode');
    this.isSignup = !this.isSignup;
  }

  public testContacts() {
    this._modalController.create({
      component: ContactsComponent
    }).then(el => el.present());
  }

  public testCamera() {
    this._modalController.create({
      component: CameraComponent
    }).then(el => el.present());
  }

  private _login() {
    this.isLoading = true;
    this.authService.login();
    this.loadingController.create({keyboardClose: true, message: 'Loggin in...'})
      .then(loadingElement => {
        loadingElement.present().then();
        setTimeout(() => {
          this.isLoading = false;
          loadingElement.dismiss().then();
          this.router.navigateByUrl('/places/tabs/discover').then();
        }, 1000);
      });
  }
}
