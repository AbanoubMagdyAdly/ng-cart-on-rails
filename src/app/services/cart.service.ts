import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartProduct } from '../models/cart';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject <Array<CartProduct>>;
  private cartTotalPrice:number = 0;


  constructor() { 
    this.cart = new BehaviorSubject(this.getCartFromLocalStorage()  || [] );
  }


  public manipulateCart(product: Product, increase:boolean = true) {
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


  public getCartTotalPrice(): number {
    return this.cartTotalPrice;
  }


  // halper functions
  // ===========================================================================
  //
  
  private updateProductCount(product: Product, increase:boolean = true){
    let cart = this.cart.value;
    let prodIndex = cart.findIndex(
      (cartProd) => cartProd.product.id == product.id
    );

    if (prodIndex == -1 && increase)
      cart.push({ product, count: 1 });
    else
      increase ? cart[prodIndex].count++: cart[prodIndex].count--;

    if(!increase && cart[prodIndex].count == 0)
      cart = cart.filter((c)=> c.product.id != cart[prodIndex].product.id)

    this.cart.next(cart)
  }


  public removeSingleProduct(product: Product) {
    let cart = this.cart.value.filter((p)=> p.product.id != product.id); 
    this.cart.next(cart)
  }


  private updateCartTotalPrice() {
    this.cartTotalPrice = 0;

    this.cart.value.forEach(cartItem => {
      this.cartTotalPrice += cartItem.product.price * cartItem.count;
    });
  }


  private getCartFromLocalStorage() {
    let cart: [CartProduct];

    try { cart = JSON.parse(window.localStorage.getItem("cart"))}
    catch (error) { window.localStorage.setItem("cart", JSON.stringify([]) ) }

    return cart
  }


  private updateLocalStorage() {
    window.localStorage.setItem("cart", JSON.stringify(this.cart.value))
  }
}

