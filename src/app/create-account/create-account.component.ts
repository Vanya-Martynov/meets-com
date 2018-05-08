import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IpService } from "../ip.service";
import { Router, Routes, RouterModule } from "@angular/router";
import { UserPhotoComponent } from "../user-photo/user-photo.component";



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {


  emailOrPhone = {
    email: true,
    phone: false,
  };

  langs: string[] = [
    'English',
    'French',
    'German',
  ];
  myform: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  language: FormControl;




  constructor(router: Router, routerModule: RouterModule, private ipService: IpService) {

  }

  setPassword(): boolean{
    let password = (<HTMLInputElement>document.getElementById('inputPassword')).value;
    let confirmPassword = (<HTMLInputElement>document.getElementById('confirmPassword')).value;
    if(password === confirmPassword){
      this.ipService.newUser.password = password;
      return true;
    }else{
      return false;
    }
  }
  clearEmail(){
    this.ipService.newUser.email = undefined;
    this.ipService.newUser.password = undefined;
  }
  clearPhone(){
    this.ipService.newUser.phone = undefined;
  }
  onChangeSetEmail(event){
    this.ipService.newUser.email = event.target.value;
  }
  onChangeSetPhone(event){
    this.ipService.newUser.phone = event.target.value;
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

  createFormControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.language = new FormControl('', Validators.required);
  }

  createForm() {
    this.myform = new FormGroup({
      name: new FormGroup({
        firstName: this.firstName,
        lastName: this.lastName,
      }),
      email: this.email,
      password: this.password,
      language: this.language
    });
  }


  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }


}
