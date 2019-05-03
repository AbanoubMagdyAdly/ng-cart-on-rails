import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authenticate(email: string) {
    window.localStorage.setItem('email', JSON.stringify(email));
  }

  public IsAuthenticated(): boolean {
    return this.getNameFromLocalStorage() ? true : false;
  }

  public logout() {
    window.localStorage.setItem('email', '');
  }

  private getNameFromLocalStorage() {
    let email: '';

    try {
      email = JSON.parse(window.localStorage.getItem('email'));
    } catch (error) {
      window.localStorage.setItem('email', '' );
    }

    return email;
  }

}
