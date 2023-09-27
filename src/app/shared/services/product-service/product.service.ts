import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from 'app/shared/models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: Product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key,
            ...c.payload.val(),
          }))
        )
      );
  }

  get(productId: string) {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId: string, product: Product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string | null) {
    return this.db.object('/products/' + productId).remove();
  }
}
