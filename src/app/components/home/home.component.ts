import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';

import {PageEvent} from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProducts:Array<Object> = this.productsService.getProducts();
  shownProducts:Array<Object> = this.allProducts.slice(0,10);
  length = this.allProducts.length;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private productsService: ProductsService) { }

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
