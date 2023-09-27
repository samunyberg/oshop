import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Order } from 'app/shared/models/order';
import { ShoppingCartService } from '../shopping-cart-service/shopping-cart.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order: Order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list<Order>('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.list<Order>('/orders', (ref) =>
      ref.orderByChild('userId').equalTo(userId)
    );
  }
}
