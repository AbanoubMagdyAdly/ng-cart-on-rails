import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jsonProducts from '../../assets/json/products';
import { Product } from '../models/product.js';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private product: BehaviorSubject<Product> = new BehaviorSubject(null);
  private apiIndex = 'http://localhost:3000/products';
  private apiShow = 'http://localhost:3000/products/';

  constructor(private http: HttpClient) {
    this.http
      .get<Product[]>(this.apiIndex)
      .subscribe(products => {
        products = products.map(product => this.mapProduct(product));
        this.products.next(products);
      });
  }

  getProducts(): BehaviorSubject<Product[]> {return this.products; }

  getSingleProduct(id: number): BehaviorSubject<Product> {
    this.http
      .get<Product>(this.apiShow + id)
      .subscribe(product => {
        return this.product.next(this.mapProduct(product));
      });
    return this.product;
  }

  private mapProduct(product): Product {
    return {
      id: product.id,
      title: product.title,
      brand: product.brand,
      category: product.category,
      price: product.price,
      images: product.product_images.map((pic) => `http://localhost:3000/${pic.url}`),
      description: product.description
    };
  }
}
