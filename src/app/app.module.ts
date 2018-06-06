import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { LoginMeetsComComponent } from './login-meets-com/login-meets-com.component';
import { AppRoutingModule } from './/app-routing.module';
import {IpService} from "./ip.service";
import { CreateAccountComponent } from './create-account/create-account.component';
import { VerificationComponent } from './verification/verification.component';
import { GenderComponent } from './gender/gender.component';
import { LocationComponent } from './location/location.component';
import { UserNameComponent } from './user-name/user-name.component';
import { UserBirthdayComponent } from './user-birthday/user-birthday.component';
import { UserPhoneComponent } from './user-phone/user-phone.component';
import { UserPhotoComponent } from './user-photo/user-photo.component';
import { EmailLinkComponent } from './email-link/email-link.component';
import { ProfileComponent } from './profile/profile.component';
import { SomeChatComponent } from './some-chat/some-chat.component';
import { ForChatRequestsService } from './for-chat-requests.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material';
import { MatButtonModule } from "@angular/material";
import { MatCheckboxModule,  MatButtonToggleModule } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PushNotificationModule } from 'ng-push-notification';
import { WatchProfileOfSomeBodyComponent } from './watch-profile-of-some-body/watch-profile-of-some-body.component';


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
    UserPhotoComponent,
    EmailLinkComponent,
    ProfileComponent,
    SomeChatComponent,
    UserProfileComponent,
    WatchProfileOfSomeBodyComponent
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
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    PushNotificationModule.forRoot(),

    NgbModule.forRoot(),
  ],
  providers: [IpService, ForChatRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
