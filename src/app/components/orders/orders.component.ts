import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private apiIndex = 'http://localhost:3000/orders';
  public orders : Object
  constructor(private http: HttpClient) { 
    this.http
      .get<Object>(this.apiIndex)
      .subscribe(data => {
        this.orders = data;
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
