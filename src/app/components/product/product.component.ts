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
        if (res.status === 200) {
          this.toastr.successToastr(`${product.id} was added to cart `, null,
          { animate: 'fade', toastTimeout: 2500, showCloseButton: true });
          this.cartService.manipulateCart(product, true);
        } else if (res.status === 422) {
          console.log('hi');
        } else if (res.status < 200) {
          this.toastr.errorToastr(`${product.title} is already in your cart`, null,
            { animate: 'fade', toastTimeout: 2500, showCloseButton: true });
        }
      }, err => console.log(err.status));
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
