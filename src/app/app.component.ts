import { Component } from '@angular/core';
import {UserProfileComponent} from "./user-profile/user-profile.component";
import{Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private router: Router){
    /*this.router.config.unshift(
      { path: 'page1', component: UserProfileComponent },
      { path: 'page2', component: UserProfileComponent }
    );
    this.links.push(
      { text: 'page1', path: 'page1' },
      { text: 'page2', path: 'page2' },
    );*/
  }

  title = 'app';
}

