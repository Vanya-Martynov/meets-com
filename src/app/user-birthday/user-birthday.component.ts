import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-birthday',
  templateUrl: './user-birthday.component.html',
  styleUrls: ['./user-birthday.component.css']
})
export class UserBirthdayComponent implements OnInit {


  userBirthday = {
    age: 0,
    display: false
  };
  getUserAge(){
    let inputValue = (<HTMLInputElement>document.getElementById('userBirthday')).value;
    let userAge = new Date(inputValue).getTime();
    let minutes = 1000 * 60;
    let hours = minutes * 60;
    let days = hours * 24;
    let years = days * 365;
    let timeRightNow = new Date().getTime();
    this.userBirthday.age = Math.round((timeRightNow - userAge)/years);
    this.userBirthday.display = true;
  }

  constructor() { }

  ngOnInit() {
  }

}
