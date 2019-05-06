import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductComponent } from '../product.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends ProductComponent implements OnInit {

  public id: number;
  public product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    router: Router,
    wishlistservice: WishlistService,
    cartService: CartService,
    toastr: ToastrManager,
    guard: AuthGuard,

  ) {
    super(cartService, toastr, wishlistservice, guard, router);
    this.id = this.route.params['value'].id;
    this.productService
      .getSingleProduct(this.id)
      .subscribe(product => {
        this.product = product;
      });
      // if(!product) this.router.navigateByUrl("/404");
  }

  ngOnInit() {
  }
}
