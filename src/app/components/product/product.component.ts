import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { ToastrManager } from 'ng6-toastr-notifications';

export class ProductComponent {

  constructor(private cartService: CartService, public toastr: ToastrManager) { }

  onAddToCart(product: Product) {
    this.cartService.manipulateCart(product, true);
    this.toastr.successToastr('One ' + product.id + ' was added to cart ', null, { animate:"fade",toastTimeout:2500 ,showCloseButton:true });
  }

}
