import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authTokenService: AuthService,
    private router: Router,
    private auth: AngularTokenService) { }

  canActivate() {
    if (this.auth.userSignedIn()) {
      return true;
    } else {
      return false;
    }
  }

}
