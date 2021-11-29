import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/model/item.model';
import { ShoppingCart } from 'src/app/model/shoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  shoppingCart: ShoppingCart = new ShoppingCart();
  isEmptyCart: boolean = false;

  private subscriptions = new Subscription();

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.updateCartUI();
    this.subscriptions.add(this.shoppingCartService.countItemsInCart.subscribe((count) => {
      this.updateCartUI();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addProductClicked(item: CartItem): void {
    this.shoppingCartService.addItemToCart(item);
  }

  reduceProductClicked(item: CartItem): void {
    this.shoppingCartService.reduceItemFromCart(item);
  }

  removeItemFromCart(item: CartItem): void {
    this.shoppingCartService.removeItemFromCart(item);
  }

  private updateCartUI(): void {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();
    this.isEmptyCart = this.shoppingCart.items.length <= 0;
  }
}
