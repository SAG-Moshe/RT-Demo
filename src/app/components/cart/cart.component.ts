import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/model/item.model';
import { ShoppingCart } from 'src/app/model/shoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  @Output() notifyCloseCart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() notifyCheckout: EventEmitter<any> = new EventEmitter();

  shoppingCart: ShoppingCart = new ShoppingCart();
  isEmptyCart = true;

  private subscriptions = new Subscription();

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.shoppingCartService.countItemsInCart.subscribe((count) => {
      this.updateCartUI();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeCart(): void {
    this.notifyCloseCart.emit(true);
  }

  addProductClicked(item: CartItem): void {
    this.shoppingCartService.addItemToCart(item);
  }

  reduceProductClicked(item: CartItem): void {
    this.shoppingCartService.reduceItemFromCart(item);
  }

  checkout(): void {
    this.notifyCheckout.emit();
  }

  private updateCartUI(): void {
    this.shoppingCart = this.shoppingCartService.getShoppingCart();
    this.isEmptyCart = this.shoppingCart.items.length <= 0;
  }
}
