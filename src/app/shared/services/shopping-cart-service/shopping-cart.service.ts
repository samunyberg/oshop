import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from 'app/shared/models/product';
import { take } from 'rxjs';
import { ShoppingCartItem } from 'app/shared/models/shopping-cart-item';
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<any> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object(`/shopping-carts/${cartId}`)
      .valueChanges()
      .pipe(map((x) => (x ? new ShoppingCart((x as any).items) : (x as any))));
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId!, product.key);
    const item = await itemRef.valueChanges().pipe(take(1)).toPromise();
    const quantity = (item?.quantity || 0) + change;
    if (quantity === 0) itemRef.remove();
    else
      itemRef.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity,
      });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object<ShoppingCartItem>(
      `/shopping-carts/${cartId}/items/${productId}`
    );
  }

  private async getOrCreateCartId(): Promise<string | null> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key;
  }
}
