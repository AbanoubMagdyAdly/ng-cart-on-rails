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
        let id = product['images'][0].id
        let fileName = product['images'][0].fileName;
        let cdn = `http://demandware.edgesuite.net/sits_pod20-adidas/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/${id}/zoom/${fileName}?sh=512`
        return {
          id:          product['id'],
          name:        product['title'],
          price:       product['price'],
          picUrl:      cdn,
          description: product['description'],}
    })
  }

  getProducts(){
    return this.products
  }

  getSingleProduct(id:number){
      return this.products[id];
  }
  
}