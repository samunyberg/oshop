import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Order } from 'app/shared/models/order';
import { AuthService } from 'shared/services/auth-service/auth.service';
import { OrderService } from 'shared/services/order-service/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent {
  orders: Order[];
  userId: string;

  constructor(authService: AuthService, orderService: OrderService) {
    if (authService.user$) {
      authService.user$
        .pipe(
          switchMap((user: any) => {
            this.userId = user.uid;
            return orderService.getOrdersByUser(this.userId).valueChanges();
          })
        )
        .subscribe((orders: any) => {
          this.orders = orders as Order[];
        });
    }
  }
}
