import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { IvyGalleryModule } from 'angular-gallery';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CategoryPageComponent,
    CheckoutPageComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyGalleryModule
  ],
  providers: [UserService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
