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
          id:          product['id'],
          name:        product['title'],
          price:       product['price'],
          picUrl:      this.getRandomImgUrl(product),
          description: product['description'],}
    })
  } 

  getProducts(){
    return this.products
  }

  getSingleProduct(id:number){
      return this.products[id];
  }
  
  getRandomImgUrl(product){
    const id       = product['images'][Math.floor(Math.random() * product['images'].length)].id,
        fileName = product['images'][Math.floor(Math.random() * product['images'].length)].fileName,
        cdn      = `http://demandware.edgesuite.net/sits_pod20-adidas/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/${id}/zoom/${fileName}?sh=512`
    return cdn;
  }

}