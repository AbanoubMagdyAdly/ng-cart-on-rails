import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce';
  constructor(private auth: AuthService, private http: HttpClient) {}
}
