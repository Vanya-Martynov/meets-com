import { Component, OnInit } from '@angular/core';
import {IpService} from "../ip.service";

@Component({
  selector: 'app-user-phone',
  templateUrl: './user-phone.component.html',
  styleUrls: ['./user-phone.component.css']
})
export class UserPhoneComponent implements OnInit {


  setUserPhone(){
    let inputValue = (<HTMLInputElement>document.getElementById('inputPhone')).value;
    let selectValue = (<HTMLInputElement>document.getElementById('selectPhoneCode')).value;
    this.ipService.newUser.phone = selectValue + inputValue;
    console.log(this.ipService.newUser.phone);
  }

  constructor(private ipService: IpService) { }

  ngOnInit() {
  }

}
