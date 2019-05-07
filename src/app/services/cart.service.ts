import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject <Array<CartItem>>;
  private cartTotalPrice: BehaviorSubject <number>;
  private cartEndPoint;

  constructor(private http: HttpClient, auth: AuthService) {
    this.cartEndPoint = 'http://localhost:3000/carts';
    this.cart           = new BehaviorSubject([]);
    this.cartTotalPrice = new BehaviorSubject(0);
    this.getCartFromDataBase();
    this.updateCartTotalPrice();
  }

  public manipulateCartRequest(product, increase = true): Observable<any> {
    let response;
    if (increase) {
      response = this.http.post<Observable<any>>(this.cartEndPoint, {
        product_id: product.id,
        increase: true,
        observe: 'response'
      });
    } else if (!increase) {
      response = this.http.post<Observable<any>>(this.cartEndPoint, {
        product_id: product.id,
        increase: false,
        observe: 'response'
      });
    }

    response.subscribe(() => this.getCartFromDataBase());
    return response;
  }

  public removeFromCart(id: number) {
    this.http.delete(`${this.cartEndPoint}/${id}`).subscribe(() => this.getCartFromDataBase()) ;
  }

  public getCart(): Observable<any> {
    return this.cart.asObservable();
  }


  public getCartTotalPrice(): Observable<any> {
    return this.cartTotalPrice.asObservable();
  }

  /*
    Helper Functions
  */

  private updateCartTotalPrice() {
    let cartTotalPrice = 0;

    this.cart.value.forEach(cartItem => {
      cartTotalPrice += cartItem.quantity * cartItem.product.price;
    });

    this.cartTotalPrice.next(cartTotalPrice);
  }


  private getCartFromDataBase() {
    this.http.get<BehaviorSubject<Array<cartItem>>>(this.cartEndPoint, {observe: 'response'}).subscribe(data => {
      let cart = [];
      data.body.forEach(cartRecord => {
        cart.push(cartRecord);
      });
      this.cart.next(cart);
      this.updateCartTotalPrice();
    });
  }

}
