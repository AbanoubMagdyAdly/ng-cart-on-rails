import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { ToastrManager } from 'ng6-toastr-notifications';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Router } from '@angular/router';

export class ProductComponent {

  constructor(
      private cartService: CartService,
      private toastr: ToastrManager,
      private wishlistservice: WishlistService,
      private guard: AuthGuard,
      public router: Router
  ) { }

  onAddToCart(product: Product) {
    if (this.guard.canActivate()) {
      this.cartService.manipulateCartRequest(product, true)
        .subscribe(res => {
          console.log(res);
          this.cartService.getCartFromDataBase()
          this.toastr.successToastr(`One ${product.title} was added to cart `, null,
            { animate: 'fade', toastTimeout: 2500, showCloseButton: true });

        }, err => {
          console.table(err, err.status);
          this.toastr.errorToastr(`${product.title} exceeded allowed quantity`, null,
            { animate: 'fade', toastTimeout: 2500, showCloseButton: true });
        });
    } else {
      this.router.navigate(['/login']);
    }
  }

  addToWishlist(product: Product) {
    const success = this.wishlistservice.addToWishlist(product);
    if (success) {
      this.toastr.successToastr(product.title + ' added to wish list ', null,
      { animate: 'fade', toastTimeout: 2500 , showCloseButton: true });
    } else {
      this.toastr.infoToastr(product.title + 'is already in your wish list ', null,
      { animate: 'fade', toastTimeout: 2500 , showCloseButton: true });
    }
  }

}
