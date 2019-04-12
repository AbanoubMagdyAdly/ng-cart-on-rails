import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ProductComponent } from '../product.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent extends ProductComponent implements OnInit {
  @Input('product') product: {};
  @Input('id') id:number;

  constructor(
    private router: Router,
    toastr: ToastrManager, cartService: CartService, wishlistservice:WishlistService,
  ) { 
    super(cartService,toastr,wishlistservice);
  }
  
  ngOnInit() {
  }

  showProduct(id:number) {
    this.router.navigate(["/products", id]);
  }
}
