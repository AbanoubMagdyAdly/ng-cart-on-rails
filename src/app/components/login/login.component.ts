import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, ControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  public loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  @Output() FormResult = new EventEmitter<any>();

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.logInUser(this.loginForm.value).subscribe(
        res => {
          if (res.status === 200) {
            this.FormResult.emit({ signedIn: true, res });
          }
        },
        err => {
          console.log('err:', err);
          this.FormResult.emit({ signedIn: false, err });
        }
      );
    }
  }
}
