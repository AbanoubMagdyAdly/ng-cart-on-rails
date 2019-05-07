import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { cartItem } from '../../../../models/cart';

@Component({
  selector: 'app-cart-mini',
  templateUrl: './cart-mini.component.html',
  styleUrls: ['./cart-mini.component.scss']
})
export class CartMiniComponent implements OnInit {
  cartCount: number;
  cart: cartItem[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cartCount = cart.length;
      this.cart = cart;
    });
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

}
