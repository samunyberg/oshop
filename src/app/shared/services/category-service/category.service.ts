import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            const val = c.payload.val();
            return {
              key: c.payload.key,
              ...(typeof val === 'object' && val !== null ? val : {}),
            };
          })
        )
      );
  }
}
