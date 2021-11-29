import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from './model/item.model';
import { User } from './model/user.model';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'real-time';
  user: User = new User();
  numberOfItemsInCart: number = 0;
  categories = ['Deals', 'Food', 'Beverages', 'Household', 'Personal Care', 'Most Popular', 'My Orders'];

  currentCategorySelected = '';
  currentPage = 'home';
  showCart = false;


  items: Array<Item> = [];

  private subscriptions = new Subscription();


  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      const un = params['un'];
      this.user = this.userService.getUsername(un);
    }));

    this.subscriptions.add(this.shoppingCartService.countItemsInCart.subscribe((count)=>{
      this.numberOfItemsInCart = count;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goHome(): void {
    this.currentCategorySelected = '';
    this.currentPage = 'home';
  }

  categoryClicked(category: string): void {
    this.currentCategorySelected = category;
    this.currentPage = 'category';
  }

  shoppingCartClicked(): void {
    if (this.currentPage !== 'checkout') {
      this.showCart = true;
    }
  }

  closeCart(cartOpenStatus: boolean): void {
    this.showCart = !cartOpenStatus;
  }

  checkout(): void {
    this.showCart = false;
    this.currentPage = 'checkout';
  }

}
