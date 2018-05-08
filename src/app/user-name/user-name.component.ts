import { Component, OnInit } from '@angular/core';
import {IpService} from "../ip.service";


@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.css']
})
export class UserNameComponent implements OnInit {


  onChangeLocation(){
    let userName = (<HTMLInputElement>document.getElementById('userName')).value;
    this.ipService.newUser.name = userName;
  }

  constructor(private ipService: IpService) {

  }


  ngOnInit() {
  }

}
