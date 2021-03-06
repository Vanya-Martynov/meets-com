import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from "@angular/router";
import { LoginMeetsComComponent } from "./login-meets-com/login-meets-com.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { VerificationComponent } from "./verification/verification.component";
import { GenderComponent } from "./gender/gender.component";
import { LocationComponent } from "./location/location.component";
import { UserNameComponent } from "./user-name/user-name.component";
import { UserBirthdayComponent } from "./user-birthday/user-birthday.component";
import { UserPhoneComponent } from "./user-phone/user-phone.component";
import { UserPhotoComponent } from "./user-photo/user-photo.component";
import { EmailLinkComponent } from "./email-link/email-link.component";
import { ProfileComponent } from "./profile/profile.component";
import { SomeChatComponent } from "./some-chat/some-chat.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import {WatchProfileOfSomeBodyComponent} from "./watch-profile-of-some-body/watch-profile-of-some-body.component";

const routes: Routes = [
  { path: 'login', component: LoginMeetsComComponent },
  { path: 'create-new-account', component: CreateAccountComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'gender', component: GenderComponent },
  { path: 'location', component: LocationComponent },
  { path: 'name', component: UserNameComponent },
  { path: 'birthday', component: UserBirthdayComponent },
  { path: 'phone-number', component: UserPhoneComponent },
  { path: 'photo', component: UserPhotoComponent },
  { path: 'email_verification', component: EmailLinkComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'chatTest', component: SomeChatComponent},
  { path: 'meets', component: UserProfileComponent},
  {
    path: 'profile',
    component: WatchProfileOfSomeBodyComponent,
    children : [{
      path: '**',
      component: WatchProfileOfSomeBodyComponent
    }]
  },
];
@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
