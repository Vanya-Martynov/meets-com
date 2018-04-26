import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginMeetsComComponent } from './login-meets-com/login-meets-com.component';
import { AppRoutingModule } from './/app-routing.module';
import {IpService} from "./ip.service";
import { CreateAccountComponent } from './create-account/create-account.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VerificationComponent } from './verification/verification.component';
import { GenderComponent } from './gender/gender.component';
import { LocationComponent } from './location/location.component';
import { UserNameComponent } from './user-name/user-name.component';
import { UserBirthdayComponent } from './user-birthday/user-birthday.component';
import { UserPhoneComponent } from './user-phone/user-phone.component';
import { UserPhotoComponent } from './user-photo/user-photo.component';

import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    LoginMeetsComComponent,
    CreateAccountComponent,
    VerificationComponent,
    GenderComponent,
    LocationComponent,
    UserNameComponent,
    UserBirthdayComponent,
    UserPhoneComponent,
    UserPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatCardModule,
  ],
  providers: [IpService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
