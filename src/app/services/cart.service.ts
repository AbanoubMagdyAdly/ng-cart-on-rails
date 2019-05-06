import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartProduct } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject <Array<CartProduct>>;
  private cartTotalPrice: BehaviorSubject <number>;
  private cartEndPoint;

  constructor(private http: HttpClient, auth: AuthService) {
    this.cartEndPoint = 'http://localhost:3000/carts';
    this.cart           = new BehaviorSubject(this.getCartFromDataBase()  || [] );
    this.cartTotalPrice = new BehaviorSubject(0);
    this.updateCartTotalPrice();
  }

  public manipulateCartRequest(product, increase = true): Observable<any> {
    if (increase) {
      return this.http.post<Observable<any>>(this.cartEndPoint, {
        product_id: product.id,
        increase: true,
        observe: 'response'
      });
    } else if (!increase) {
      return this.http.post<Observable<any>>(this.cartEndPoint, {
        product_id: product.id,
        increase: false,
        observe: 'response'
      });
    }
  }
  public removeFromCart(id: number) {
    this.http.delete(`${this.cartEndPoint}/${id}`).subscribe() ;
    this.updateCartTotalPrice();

  }

  public manipulateCart(product: Product, increase: boolean = true) {
    this.updateProductCount(product, increase);
    this.updateCartTotalPrice();
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

  private updateProductCount(product: Product, increase: boolean = true) {
    let cart = this.cart.value;
    const prodIndex = cart.findIndex(
      (cartProd) => cartProd.product.id === product.id
    );

    if (prodIndex === -1 && increase) {
      cart.push({ product, count: 1 });
    } else {
      increase ? cart[prodIndex].count++ : cart[prodIndex].count--;
    }

    if (!increase && cart[prodIndex].count === 0) {
      cart = cart.filter((c) => c.product.id !== cart[prodIndex].product.id);
    }

    this.cart.next(cart);
  }

  private updateCartTotalPrice() {
    let cartTotalPrice = 0;

    this.cart.value.forEach(cartProduct => {
      cartTotalPrice += cartProduct.count * cartProduct.product.price;
    });

    this.cartTotalPrice.next(cartTotalPrice);
  }


  private getCartFromDataBase() {
// tslint:disable-next-line: prefer-const
    let cart: [] = [];
    this.http.get<[]>(this.cartEndPoint, {observe: 'response'}).subscribe(data => {
      data.body.forEach((product) => {
        console.log(product);
      });
    });
    return cart;
  }

}
