import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/shared/models/product';
import { ProductService } from 'shared/services/product-service/product.service';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart-service/shopping-cart.service';
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart: ShoppingCart) => {
        this.cart = cart;
        console.log('Getting a cart in products');
      }
    );
    this.populateProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products as Product[];
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter((p) => p.category === this.category)
      : this.products;
  }
}
