import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';

import {PageEvent} from '@angular/material';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProducts:Product[];
  shownProducts:Product[];
  length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe(data=>{
      this.allProducts = data
      this.shownProducts = this.allProducts.slice(0,10);
      this.length = this.allProducts.length;
    });
  }

  ngOnInit() {
  }

  updateShownProducts(){
    let lowerLimit = (this.pageEvent.pageIndex) * this.pageEvent.pageSize;
    let upperLimit = (this.pageEvent.pageIndex+1) *this.pageEvent.pageSize;
    this.shownProducts = this.allProducts.slice(lowerLimit, upperLimit)
  }
  // MatPaginator Output
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
