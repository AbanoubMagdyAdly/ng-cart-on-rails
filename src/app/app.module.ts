import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { WishlistService } from './services/wishlist.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { CartMiniComponent } from './components/header/partials/cart-mini/cart-mini.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { WishlistComponent } from './components/header/partials/wishlist/wishlist.component';
import { InputComponent } from './components/shared/input/input.component';
import { AngularTokenModule } from 'angular-token';
import { AuthService } from './services/auth.service';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatInputModule, MatCardModule,
  MatTableModule, MatGridListModule, MatPaginatorModule
 } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CartMiniComponent,
    CartComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    WishlistComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000',

      signInPath: 'auth/sign_in',
      signOutPath: 'auth/sign_out',
      validateTokenPath: 'auth/validate_token',
    }),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    ToastrModule.forRoot(),
    MatPaginatorModule
  ],
  providers: [ProductsService, CartService, WishlistService, AngularTokenModule, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
