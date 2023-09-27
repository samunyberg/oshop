import { Component, OnInit } from '@angular/core';
import { Order } from 'app/shared/models/order';
import { OrderService } from 'shared/services/order-service/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService
      .getOrders()
      .valueChanges()
      .subscribe((orders) => {
        this.orders = orders as Order[];
      });
  }
}
