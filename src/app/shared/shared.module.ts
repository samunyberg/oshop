import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { AuthService } from './services/auth-service/auth.service';
import { CategoryService } from './services/category-service/category.service';
import { OrderService } from './services/order-service/order.service';
import { ProductService } from './services/product-service/product.service';
import { ShoppingCartService } from './services/shopping-cart-service/shopping-cart.service';
import { UserService } from './services/user-service/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NoopAnimationsModule,
    FontAwesomeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  declarations: [ProductCardComponent, ProductQuantityComponent],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NoopAnimationsModule,
    FontAwesomeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ],
})
export class SharedModule {}
