import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/models/password-validation';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  message = '';
  errorMessage = '';
  @Output() FormResult = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      address: [''],
      avatar: ['']
    },
    {
      validator: MustMatch('password', 'confirm_password')
    });
  }

  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('name', this.registerForm.get('name').value);
    uploadData.append('email', this.registerForm.get('email').value);
    uploadData.append('password', this.registerForm.get('password').value);
    uploadData.append('confirm_password', this.registerForm.get('confirm_password').value);
    uploadData.append('address', this.registerForm.get('address').value);
    uploadData.append('avatar', this.registerForm.get('avatar').value);

    this.http.post('http://localhost:3000/users', uploadData).subscribe(
      res => this.router.navigate(['/login']), err => console.log(err));
  }

  uploadDocument(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.registerForm.get('avatar').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
