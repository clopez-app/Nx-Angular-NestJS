import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappInputHelpersModule,
  ClappNotificationModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpService } from './services/sign-up.service';
import { LoginService } from './services/login.service';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [SignUpComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModule,
    ClappCardModule,
    ClappTextInputModule,
    ClappButtonModule,
    ReactiveFormsModule,
    ClappInputHelpersModule,
    LoaderComponent,
    ClappNotificationModule,
    AuthRoutingModule,
  ],
  providers: [SignUpService, LoginService],
})
export class AuthModule {}
