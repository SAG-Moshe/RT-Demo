export class Item {
  code: string = '';
  name: string = '';
  price: number = 0;
  path: string = '';

  constructor() { };
}

export class CartItem extends Item {
  amount: number = 0;
  totalPrice: number = this.price * this.amount;

  constructor(item?: Item) {
    super();
    if (item) {
      this.code = item.code;
      this.name = item.name;
      this.price = item.price;
      this.path = item.path;
    }
  }
}
