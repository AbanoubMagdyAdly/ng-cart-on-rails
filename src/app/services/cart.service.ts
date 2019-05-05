import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartProduct } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject <Array<CartProduct>>;
  private cartTotalPrice: BehaviorSubject <number>;


  constructor() {
    this.cart           = new BehaviorSubject(this.getCartFromLocalStorage()  || [] );
    this.cartTotalPrice = new BehaviorSubject(0);
    this.updateCartTotalPrice();
  }


  public manipulateCart(product: Product, increase: boolean = true) {
    this.updateProductCount(product, increase);
    this.updateLocalStorage();
    this.updateCartTotalPrice();
  }


  public removeFromCart(product: Product) {
    this.removeSingleProduct(product);
    this.updateLocalStorage();
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
    const productIndex = cart.findIndex(
      (cartProd) => cartProd.product.id === product.id
    );

    if (productIndex === -1 && increase) {
      cart.push({ product, count: 1 });
    } else {
      increase ? cart[productIndex].count++ : cart[productIndex].count--;
    }

    if (!increase && cart[productIndex].count === 0) {
      cart = cart.filter((c) => c.product.id !== cart[productIndex].product.id);
    }

    this.cart.next(cart);
  }


  public removeSingleProduct(product: Product) {
    const cart = this.cart.value.filter((p) => p.product.id !== product.id);
    this.cart.next(cart);
  }


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
      cart = JSON.parse(window.localStorage.getItem("cart"));
    } catch (error) {
      window.localStorage.setItem("cart", JSON.stringify([]));
    }

    return cart;
  }


  private updateLocalStorage() {
    window.localStorage.setItem("cart", JSON.stringify(this.cart.value));
  }
}

