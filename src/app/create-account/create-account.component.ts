import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import {MatStepperModule} from '@angular/material/stepper';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  emailOrPhone = {
    email: true,
    phone: false,
  };

  @ViewChild('stepper') stepper;
  @ViewChild('form') form;

  /**
   * Changes the step to the index specified
   * @param {number} index The index of the step
   */
  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }

  constructor(private _formBuilder: FormBuilder) { }


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
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
