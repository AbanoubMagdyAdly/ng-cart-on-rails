import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cart';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  private ordersEndpoint = 'http://localhost:3000/orders';
  totalPrice = 0;
  cart: Array<CartItem>;

  displayedColumns: string[] = ['image', 'id', 'title', 'addRemove', 'price', 'quantity', 'totalPrice', 'delete'];
  dataSource;

  constructor(private cartService: CartService,private http: HttpClient,private router: Router) { }

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

  checkout(coupon_code){
    console.log(coupon_code)
    this.http.post(this.ordersEndpoint,{
      coupon_code : coupon_code
    }).subscribe(res => this.cartService.getCartFromDataBase());
    this.router.navigate(['home']);
  }

}