import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  emailOrPhone = {
    email: true,
    phone: false,
  };
  color = 'primary';
  time = {
    seconds: 15,
  };
  lowerThanTen = false;
  timerActive = true;


  checkTime(){
    let index = setInterval(()=>{
      this.time.seconds--;
      if(this.time.seconds < 10){
        this.lowerThanTen = true;
      }
      if(this.time.seconds === 0){
        this.timerActive = false;
        clearInterval(index);
      }
    }, 1000);

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

  constructor() {

  }

  ngOnInit() {
    this.checkTime();
  }

}
