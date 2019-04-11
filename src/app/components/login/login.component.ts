import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password : new FormControl('', [
      Validators.required,
    ])
  });


  constructor(private router : Router, private auth:AuthService) { }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if(this.loginForm.valid){
      this.auth.authenticate(this.f.email.value)
      this.router.navigate(['/home']);
    }
  }

}