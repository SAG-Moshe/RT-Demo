import { Component, Input, OnDestroy, OnInit,  } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit, OnDestroy {

  @Input() categoryName: string = '';

  galleryImages: Array<any> = [];

  constructor(private shoppingCartService: ShoppingCartService,
              private itemService: ItemsService) { }

  ngOnInit(): void {
    this.galleryImages = this.itemService.getItemsPerCategory('Food');
  }

  ngOnDestroy(): void {

  }
  productClicked(index: number): void {
    this.shoppingCartService.addItemToCart(this.galleryImages[index]);
  }
}
