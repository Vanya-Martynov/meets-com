import { Component, OnInit } from '@angular/core';
import { IpService } from "../ip.service";

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  setGenderMale(){
    this.ipService.newUser.gender = 'male';

  }
  setGenderFemale(){
    this.ipService.newUser.gender = 'female';
  }

  constructor(private ipService: IpService) {

  }

  ngOnInit() {
  }

}
