import { Component, OnInit } from '@angular/core';
import {IpService} from "../ip.service";

@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.css']
})
export class UserPhotoComponent implements OnInit {

  file: File;
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    let _this = this;
    let userPhoto = document.getElementById('userPhoto');
    let imgEditPhoto = document.getElementById('addPhotoImg');
    let reader  = new FileReader();

    reader.addEventListener("load", function () {
      console.log(reader.result);
      _this.ipService.newUser.photo = reader.result;
      console.log(_this.ipService.newUser);
      userPhoto.setAttribute('src', reader.result);
      imgEditPhoto.setAttribute('src', '../../assets/img-login/edit.png');
    }, false);

    if (this.file) {
      reader.readAsDataURL(this.file);
    }
  }

  createNewUser(){
    this.ipService.createNewUser( '', this.ipService.newUser);
  }

  constructor(private ipService: IpService) { }

  ngOnInit() {
  }

}
