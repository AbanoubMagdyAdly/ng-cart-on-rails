import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { ToastrManager } from 'ng6-toastr-notifications';
import { WishlistService } from 'src/app/services/wishlist.service';

export class ProductComponent {

  constructor(
      private cartService: CartService,
      private toastr: ToastrManager,
      private wishlistservice: WishlistService
  ) { }

  onAddToCart(product: Product) {
    this.cartService.addCartRequest(product, true)
    .subscribe(res => {
        console.log(res);
        this.toastr.successToastr(`${product.id} was added to cart `, null,
          { animate: 'fade', toastTimeout: 2500, showCloseButton: true });

        this.cartService.manipulateCart(product, true);
      }, err => {
        console.table(err, err.status);
        this.toastr.errorToastr(`${product.title} is already in your cart`, null,
            { animate: 'fade', toastTimeout: 2500, showCloseButton: true });
      });
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
