import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: {};
  @Input('id') id:number;

  constructor(private cartService: CartService,private router: Router) { 
  }

  ngOnInit() {
  }

  showProduct(id:number) {
    this.router.navigate(["/products", id]);
  }
  
  onAddToCart(product: Product) {
    this.cartService.manipulateCart(product, true);
  }

}
