import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductComponent } from '../product.component';
import { ToastrManager } from 'ng6-toastr-notifications';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends ProductComponent implements OnInit {

  public id: number;
  public product: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodcutService: ProductsService,
    wishlistservice: WishlistService,
    cartService: CartService,
    toastr: ToastrManager,
  ) {
    super(cartService, toastr, wishlistservice);
    this.id = this.route.params['value'].id;
    this.prodcutService
      .getSingleProduct(this.id)
      .subscribe(product => {
        this.product = product;
      });
      // if(!product) this.router.navigateByUrl("/404");
  }

  ngOnInit() {
  }
}
