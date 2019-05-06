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
    this.cart           = new BehaviorSubject(this.getCartFromLocalStorage()  || [] );
    this.cartTotalPrice = new BehaviorSubject(0);
    this.cartEndPoint = 'http://localhost:3000/carts';
    this.updateCartTotalPrice();
  }

  public addCartRequest(product, increase = true): Observable<any> {
    // return fetch(this.cartEndPoint, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ product_id: product.id })
    // });
    return this.http.post(this.cartEndPoint, {
      headers: product,
      observe: 'response'
    });
  }
  public removeSingleProduct(product: Product) {
    return fetch(`${this.cartEndPoint}/${product.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id: product.id })
    });
  }

  public manipulateCart(product: Product, increase: boolean = true) {
    this.updateProductCount(product, increase);
    this.updateCartTotalPrice();
  }

  public removeFromCart(product: Product) {
    this.removeSingleProduct(product);
    // Todo Update this
    // this.updateLocalStorage();
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


  // public removeSingleProduct(product: Product) {
  //   const cart = this.cart.value.filter((p) => p.product.id !== product.id);
  //   this.cart.next(cart);
  // }


  private updateCartTotalPrice() {
    let cartTotalPrice = 0;

    this.cart.value.forEach(cartProduct => {
      cartTotalPrice += cartProduct.count * cartProduct.product.price;
    });

    this.cartTotalPrice.next(cartTotalPrice);
  }


  private getCartFromLocalStorage() {
    let cart: [CartProduct];

    try {
      cart = JSON.parse(window.localStorage.getItem('cart'));
    } catch (error) {
      window.localStorage.setItem('cart', JSON.stringify([]));
    }

    return cart;
  }

}

