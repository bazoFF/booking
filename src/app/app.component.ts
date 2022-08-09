import { Component } from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {Capacitor} from "@capacitor/core";
import {Geolocation} from "@capacitor/geolocation";
import {Camera, CameraResultType} from "@capacitor/camera";
import {Toast} from "@capacitor/toast";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router, private _platform: Platform) {
    this.initApp();
  }

  initApp() {
    this._platform.ready().then(() => {
      // console.log('PLATFORMS:');
      // console.log(this._platform.platforms());
      //
      // console.log('PLATFORM IS NATIVE?');
      // console.log(Capacitor.isNativePlatform());
      //
      // Geolocation.getCurrentPosition().then(res => {
      //   console.log('CURRENT LOCATION:');
      //   console.log(res);
      // });
      //
      // Camera.pickImages({quality: 100}).then(result => {
      //   console.log('TAKE PHOTO:');
      //   console.log(result);
      // });
      // console.log('Hello');
      // Toast.show({
      //   text: 'Hello!',
      // }).then();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth').then();
  }
}
