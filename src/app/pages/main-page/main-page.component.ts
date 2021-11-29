import { Component, OnDestroy, OnInit } from '@angular/core';
import { Gallery } from 'angular-gallery';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/model/item.model';
import { User } from 'src/app/model/user.model';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  // galleryImages = [
  //   {path: '../../../assets/imgs/mainPage/1.png'},
  //   {path: '../../../assets/imgs/mainPage/1.png'},
  //   {path: '../../../assets/imgs/mainPage/1.png'},
  //   {path: '../../../assets/imgs/mainPage/1.png'},
  //   {path: '../../../assets/imgs/mainPage/1.png'}
  // ]

  galleryImages: Array<any> = [];
  user: User = new User();

  private subscription: Subscription = new Subscription();

  constructor(private itemService: ItemsService,
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    private gallery: Gallery) { }

  ngOnInit(): void {
    this.subscription.add(this.userService.currentUser.subscribe((user) => {
      this.user = user;
    }))
    this.galleryImages = this.itemService.getItemsPerCategory('Food');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showGallery(index: number) {
    let prop = {
      images: this.galleryImages,
      index,
      arrows: true
    };
    this.gallery.load(prop);
  }

  productClicked(index: number): void {
    this.shoppingCartService.addItemToCart(this.galleryImages[index]);
   }
}
