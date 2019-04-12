import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-mini',
  templateUrl: './cart-mini.component.html',
  styleUrls: ['./cart-mini.component.scss']
})
export class CartMiniComponent implements OnInit {
  cartCount:number;
  cart:Array<Object>;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cartCount = cart.length;
      this.cart = cart;
    });
  }
  
  removeFromCart(product:Product){
    this.cartService.removeFromCart(product);
  }

}
