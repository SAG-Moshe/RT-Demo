import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  //['Deals', 'Food', 'Beverages', 'Household', 'Personal Care', 'Most Popular', 'My Orders']

  food: Array<Item> = []

  constructor() {
    this.food = this.setFoodItems().concat();
   }

  getItemsPerCategory(categoryName: string): Array<Item> {
    switch(categoryName) {
      case 'Food': return this.food;
    }

    return this.getEmptyArrayOfItems();
  }


  private getEmptyArrayOfItems(): Array<Item> {
    const emptyArray: Array<Item> = [];
    return emptyArray;
  }

  private setFoodItems() : Array<Item> {
    const foodItems: Array<Item> = [
      {
        code: 'f0001',
        name:'Milk',
        price: 2.25,
        path: '../../../assets/imgs/mainPage/1.png'
      },
      {
        code: 'f0002',
        name:'Cheese',
        price: 3.5,
        path: '../../../assets/imgs/mainPage/1.png'
      }
    ]

    return foodItems;
  }
}
