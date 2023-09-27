import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../shared/services/auth-service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userCredentials = {
    email: '',
    password: '',
  };
  loginError: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  async loginWithEmailAndPassword() {
    try {
      await this.auth.loginWithEmailAndPassword(
        this.userCredentials.email,
        this.userCredentials.password
      );
      this.router.navigate(['/']);
    } catch (error) {
      this.loginError = true;
    }
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
}
