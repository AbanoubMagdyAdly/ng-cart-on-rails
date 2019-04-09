import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jsonProducts from '../../assets/json/products';
import { Product } from '../models/product.js';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products:Product[];

  constructor() { 
    let products = jsonProducts.default.prodcuts
    this.products = products.map(product => {
        return {
        id:          product['ProductId'],
        name:        product['Name'],
        price:       product['Price'],
        picUrl:      product['ProductPicUrl'],
        description: product['Description'],}
    })
  }

  getProducts(){
    return this.products
  }

  getSingleProduct(id:number){
      return this.products[id];
  }
  
}