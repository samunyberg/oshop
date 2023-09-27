import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([])],
  declarations: [NavbarComponent, HomeComponent, LoginComponent],
  exports: [NavbarComponent],
})
export class CoreModule {}
