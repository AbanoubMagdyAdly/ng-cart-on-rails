import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ProductComponent } from '../product.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent extends ProductComponent implements OnInit {
  @Input() product: {};
  @Input() id: number;

  constructor(
    router: Router,
    toastr: ToastrManager,
    cartService: CartService,
    wishlistservice: WishlistService,
    guard: AuthGuard,
  ) {
    super(cartService, toastr, wishlistservice, guard, router);
  }

  ngOnInit() {}

  showProduct(id: number) {
    this.router.navigate(['/products', id]);
  }
}
