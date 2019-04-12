import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: BehaviorSubject <Array<Product>>;


  constructor() { 
    this.wishlist = new BehaviorSubject(this.getWishlistFromLocalStorage()  || [] );
  }

  public addToWishlist(product: Product) {
    let wishlist = this.wishlist.value;
    let prodIndex = wishlist.findIndex(
      (prod) => prod.id == product.id
    );

    if (prodIndex == -1)
      wishlist.push(product);

    this.updateLocalStorage();
    this.wishlist.next(wishlist)
  }

  public removeFromWishlist(product: Product) {
    this.removeSingleProduct(product);
    this.updateLocalStorage();
  }

  public getWishlist(): Observable<any> {
    return this.wishlist.asObservable();
  }

  // halper functions
  // ===========================================================================
  //
  public removeSingleProduct(product: Product) {
    let wishlist = this.wishlist.value.filter((p)=> p.id != product.id); 
    this.wishlist.next(wishlist)
  }

  private getWishlistFromLocalStorage() {
    let wishlist: [Product];

    try { wishlist = JSON.parse(window.localStorage.getItem("wishlist"))}
    catch (error) { window.localStorage.setItem("wishlist", JSON.stringify([]) ) }

    return wishlist
  }

  private updateLocalStorage() {
    window.localStorage.setItem("wishlist", JSON.stringify(this.wishlist.value))
  }
}