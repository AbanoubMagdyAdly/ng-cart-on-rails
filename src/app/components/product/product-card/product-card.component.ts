import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ProductComponent } from '../product.component';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent extends ProductComponent implements OnInit {
  @Input('product') product: {};
  @Input('id') id:number;

  constructor(
    toastr: ToastrManager,
    cartService: CartService,
    private router: Router,
  ) { 
    super(cartService,toastr);
  }

  ngOnInit() {
  }

  showProduct(id:number) {
    this.router.navigate(["/products", id]);
  }
}
