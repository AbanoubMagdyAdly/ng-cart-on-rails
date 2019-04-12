import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public email:string;

  constructor(private router: Router, private auth:AuthService,) { }
  
  isLoggedIn(){
    return this.auth.IsAuthenticated();
  }

  onLogout(){
    this.auth.logout();
    this.router.navigate['/home'];
  }
  ngOnInit() {
  }
}
