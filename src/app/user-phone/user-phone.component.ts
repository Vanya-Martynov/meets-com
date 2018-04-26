import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-phone',
  templateUrl: './user-phone.component.html',
  styleUrls: ['./user-phone.component.css']
})
export class UserPhoneComponent implements OnInit {


  emailOrPhone = {
    email: true,
    phone: false,
  };


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

  constructor() { }

  ngOnInit() {
  }

}
