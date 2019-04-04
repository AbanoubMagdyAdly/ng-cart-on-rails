import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:Array<Object> = []

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products=>{
      products.forEach(product => {
        this.products.push({
            name:        product['Name'],
            price:       product['Price'],
            picUrl:      product['ProductPicUrl'],
            description: product['Description'],
        })
      });
    })
  }
}
