import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  products: Product[];

  constructor(private http: HttpClient, private productService: ProductsService) {

  }

  ngOnInit() { }

  onSubmit(search) {
    this.productService.getFilteredProducts(search);
  }
}
