import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public id:number;
  public product:Product;

  constructor(private route: ActivatedRoute, private prodcutService: ProductsService) { }

  ngOnInit() {
    this.id = this.route.params['value'].id;
    this.product = this.prodcutService.getSingleProduct(this.id);
  }

}
