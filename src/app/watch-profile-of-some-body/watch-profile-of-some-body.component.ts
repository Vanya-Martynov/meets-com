import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HoldAllUsersService } from "../hold-all-users.service";

@Component({
  selector: 'app-watch-profile-of-some-body',
  templateUrl: './watch-profile-of-some-body.component.html',
  styleUrls: ['./watch-profile-of-some-body.component.css']
})
export class WatchProfileOfSomeBodyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private allUsers: HoldAllUsersService) { }

  myRe = /^[^/]*/;
  mystr = window.location.href;
  myArray = this.myRe.exec(this.mystr.split('').reverse().join(''));

  ngOnInit() {
    console.log(this.myArray[0].split('').reverse().join(''));
    this.allUsers.arrayOfUsers.forEach((el)=>{
      console.log(el);
    })
  }

}
