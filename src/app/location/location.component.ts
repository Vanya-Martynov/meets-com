import { Component, OnInit } from '@angular/core';
import { IpService } from "../ip.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {


  onChangeLocation(){
    let location = (<HTMLInputElement>document.getElementById('userLocation')).value;
    this.ipService.newUser.location = location;
  }

  constructor(private ipService: IpService) {

  }

  ngOnInit() {
  }

}
