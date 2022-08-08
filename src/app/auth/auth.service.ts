import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true; // todo: switch to false
  private _userId = 'dd0c1776-e790-45f0-9e25-e1f85711656a'

  get userIsAuthenticated(): boolean {
    return this._userIsAuthenticated;
  }

  get userId(): string {
    return this._userId;
  }

  constructor() { }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
