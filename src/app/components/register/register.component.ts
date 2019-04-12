import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private router : Router, private auth:AuthService) {
    if(this.auth.IsAuthenticated())
      this.router.navigateByUrl("/home");
   }

  ngOnInit() {
  }

  onSubmit() {
    if(this.registerForm.valid){
      this.auth.authenticate(this.registerForm.controls.email.value)
      this.router.navigate(['/home']);
    }
  }
}
