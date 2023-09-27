import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'app/shared/models/order';
import { Shipping } from 'app/shared/models/shipping';
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth-service/auth.service';
import { OrderService } from 'shared/services/order-service/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  userSubscription: Subscription | undefined;
  userId: string;
  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$?.subscribe((user) => {
      this.userId = user.uid;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);

    this.router.navigate(['order-success', result.key]);
  }
}
