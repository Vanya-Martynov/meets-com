import { Component, OnInit } from '@angular/core';
import {IpService} from "../ip.service";

@Component({
  selector: 'app-email-link',
  templateUrl: './email-link.component.html',
  styleUrls: ['./email-link.component.css']
})
export class EmailLinkComponent implements OnInit {
  email_verification = false;
  hashFromUrl = window.location.href.slice(-40);
  token = Date.now();
  userData = JSON.stringify({
    message: 'test',
    hash: 'hashFromUrl',
    time: this.token + 20001
  });

  constructor(private ipService: IpService) {
    this.email_verification = true;
    this.ipService.createNewUser( 'createSomeUser', {
      message: 'test',
      hash: this.hashFromUrl,
      time: this.token + 20001
    });
  }

  ngOnInit() {
  }

}
