import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
@Input('product') product: {};

  constructor(private cartService: CartService) { 
  }

  ngOnInit() {
  }
  
  onAddToCart(product: Product) {
    this.cartService.manipulateCart(product, true);
  }

}
