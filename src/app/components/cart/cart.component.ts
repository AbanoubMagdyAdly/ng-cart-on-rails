import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { CartProduct } from 'src/app/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  totalPrice = 0;
  cart: Array<CartProduct>;

  displayedColumns: string[] = ['image', 'id', 'title', 'addRemove', 'price', 'quantity', 'totalPrice', 'delete'];
  dataSource;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.dataSource = this.cart;
    });
    this.cartService.getCartTotalPrice().subscribe(totalPrice =>
      this.totalPrice = totalPrice
    );
  }

  addToCart(product: Product) {
    this.cartService.manipulateCartRequest(product, true);
  }

  removeOneFromCart(product: Product) {
    this.cartService.manipulateCartRequest(product, false);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

}
