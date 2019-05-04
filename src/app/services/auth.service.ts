import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularTokenService } from 'angular-token';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSignedIn$: Subject<boolean> = new Subject();

  constructor(public authService: AngularTokenService) {

    this.authService.validateToken().subscribe(
      res => {
        return res.success === true ? this.userSignedIn$.next(res.success) : this.userSignedIn$.next(false);
      }
    );
  }

  registerUser(formData): Observable<Response> {
    return this.authService.registerAccount(formData).pipe(map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      }));
  }

  logInUser(signInData: { login: string, password: string }): Observable<Response> {
    return this.authService.signIn(signInData).pipe(map(
      res => {
        this.userSignedIn$.next(true);
        return res;
      }
    ));
  }

  logOutUser(): Observable<Response> {
    return this.authService.signOut().pipe(map(res => {
      this.userSignedIn$.next(false);
      return res;
    }));
  }
}
