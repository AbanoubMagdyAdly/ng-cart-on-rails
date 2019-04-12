import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  private wishlist: Array<Product>;
  private count:number;

  constructor(private wishlistservice:WishlistService) { }

  ngOnInit() {
    this.wishlistservice.getWishlist()
      .subscribe((wishlist)=>{
        this.wishlist = wishlist;
        this.count = wishlist.length;
      })
  }

  removeFromWishlist(product:Product){
    this.wishlistservice.removeFromWishlist(product);
  }
}
