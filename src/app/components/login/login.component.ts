import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(3)])
  });


  constructor(private router: Router, private auth: AuthService, private tokenAuthService: AngularTokenService) {
    if (this.auth.IsAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
   }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // this.auth.authenticate(this.loginForm.controls.email.value)
      this.tokenAuthService.signIn(this.loginForm.value).subscribe(
        res => console.log(res),
        err => console.log('err:', err)
      );
      this.router.navigate(['/home']);
    }
  }

}
