import { CartItem } from "./item.model";

export class ShoppingCart {
  items: Array<CartItem> = [];
  sum: number = 0;
  count: number = 0;

  constructor() {}
}
