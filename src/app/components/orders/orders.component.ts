import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private ordersEndpoint = 'http://localhost:3000/orders';
  public orders;
  constructor(private http: HttpClient, private router: Router, private guard: AuthGuard) {
    this.guard.canActivate();
    this.http.get(this.ordersEndpoint)
      .subscribe(data => {
        this.orders = data;
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
