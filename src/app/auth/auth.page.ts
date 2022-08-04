import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public isLoading: boolean;
  public isSignup: boolean;

  constructor(private authService: AuthService, private router: Router, private loadingController: LoadingController) { }

  get modeName() {
    return this.isSignup ? 'login' : 'signup';
  }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    this.authService.login();
    this.loadingController.create({keyboardClose: true, message: 'Loggin in...' })
      .then(loadingElement => {
        loadingElement.present().then();
        setTimeout(() => {
          this.isLoading = false;
          loadingElement.dismiss().then();
          this.router.navigateByUrl('/places/tabs/discover').then();
        }, 1000);
      });
  }

  submit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form.value);

    if (this.isSignup) {
      // Send a request to signup servers
    } else {
      // Send a request to login servers
    }
  }

  switchAuthMode() {
    this.isSignup = !this.isSignup;
  }
}
