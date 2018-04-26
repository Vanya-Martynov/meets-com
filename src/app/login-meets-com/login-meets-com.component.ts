import { Component, OnInit } from '@angular/core';
import { IpService } from "../ip.service";

@Component({
  selector: 'app-login-meets-com',
  templateUrl: './login-meets-com.component.html',
  styleUrls: ['./login-meets-com.component.css']
})
export class LoginMeetsComComponent implements OnInit {

  emailOrPhone = {
    email: true,
    phone: false,
  };

  constructor(private ipService: IpService) {

  }

  showEmail(e){
    this.emailOrPhone.email = true;
    this.emailOrPhone.phone = false;
    let buttonEmail = document.getElementById('buttonEmail');
    buttonEmail.classList.remove('my-button-muted');
    buttonEmail.classList.add('my-button-active');

    let buttonPhone = document.getElementById('buttonPhone');
    buttonPhone.classList.add('my-button-muted');
    buttonPhone.classList.remove('my-button-active');
  }

  showPhone(){
    this.emailOrPhone.phone = true;
    this.emailOrPhone.email = false;
    let buttonPhone = document.getElementById('buttonPhone');
    buttonPhone.classList.remove('my-button-muted');
    buttonPhone.classList.add('my-button-active');

    let buttonEmail = document.getElementById('buttonEmail');
    buttonEmail.classList.add('my-button-muted');
    buttonEmail.classList.remove('my-button-active');
  }


  ngOnInit() {
    console.log('Init...........');
    this.ipService.getHero();
  }

}
