import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth-service/auth.service';
import {
  faChevronDown,
  faLeaf,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { AppUser } from 'shared/models/app-user';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart-service/shopping-cart.service';
import { ShoppingCart } from 'app/shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser | null;
  showDropdownMenu = false;
  chevronIcon = faChevronDown;
  leafIcon = faLeaf;
  cartIcon = faShoppingCart;
  cart$: Observable<ShoppingCart | null>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));

    this.cart$ = await this.shoppingCartService.getCart();
  }

  toggleDropdownMenu() {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  logout() {
    this.auth.logout();

    this.router.navigate(['/']);
  }
}
