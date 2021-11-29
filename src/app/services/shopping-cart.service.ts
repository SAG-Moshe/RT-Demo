import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Item } from '../model/item.model';
import { ShoppingCart } from '../model/shoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private itemsInCart: Array<CartItem> = []
  private totalSum: number = 0;
  private totalItemsInCart: number = 0;

  public countItemsInCart: BehaviorSubject<number> = new BehaviorSubject(this.totalItemsInCart);

  constructor() { }

  addItemToCart(item: Item): void {
    const itemCode = item.code;
    let itemIndex = this.getItemIndex(itemCode);

    if (itemIndex === -1) {
      this.itemsInCart.push(new CartItem(item));
      itemIndex = 0;
    }

    this.itemsInCart[itemIndex].amount++;
    this.itemsInCart[itemIndex].totalPrice += this.itemsInCart[itemIndex].price;
    this.totalItemsInCart++;
    this.totalSum = this.totalSum + this.itemsInCart[itemIndex].price;

    this.countItemsInCart.next(this.totalItemsInCart);
  }

  /**
   * @description Reduces one from the total amount of a single item
   * @param item
   */
  reduceItemFromCart(item: Item): void {
    const itemCode = item.code;
    let itemIndex = this.getItemIndex(itemCode);

    if (itemIndex > -1 && this.itemsInCart[itemIndex].amount > 0) {
      this.itemsInCart[itemIndex].amount--;
      this.itemsInCart[itemIndex].totalPrice -= this.itemsInCart[itemIndex].price;
      this.totalItemsInCart--;
      this.totalSum = this.totalSum - this.itemsInCart[itemIndex].price;

      if (this.itemsInCart[itemIndex].amount === 0) {
        this.itemsInCart.splice(itemIndex, 1);
      }

      this.countItemsInCart.next(this.totalItemsInCart);
    }
  }

  /**
   * @description Removes all amount of a single item from cart
   * @param item
   */
  removeItemFromCart (item: Item): void {
    const itemCode = item.code;
    let itemIndex = this.getItemIndex(itemCode);

    if (itemIndex > -1) {
      this.totalItemsInCart -= this.itemsInCart[itemIndex].amount;
      this.totalSum -= this.itemsInCart[itemIndex].totalPrice;
      this.itemsInCart.splice(itemIndex, 1);
      this.countItemsInCart.next(this.totalItemsInCart);
    }
  }


  getShoppingCart(): ShoppingCart {
    return {
      items: this.itemsInCart,
      sum: this.totalSum,
      count: this.totalItemsInCart
    }
  }

  private getItemIndex(itemCode: string): number {
    return this.itemsInCart.findIndex((itemInCart) => { return itemInCart.code === itemCode });
  }
}
