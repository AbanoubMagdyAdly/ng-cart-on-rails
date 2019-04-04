import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  location = '../../../assets/json/products.json';

  constructor(private http: HttpClient) { }

  getProducts():Observable<any> {
    return this.http.get(this.location, {responseType: 'json'})
  }
}