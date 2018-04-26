import { Component, OnInit } from '@angular/core';

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
    console.log(this.file);
    let img = document.getElementById('userPhoto');
    console.log(img);
    let reader  = new FileReader();

    reader.addEventListener("load", function () {
      img.src = reader.result;
    }, false);

    if (this.file) {
      reader.readAsDataURL(this.file);
    }
  }



  constructor() { }

  ngOnInit() {
  }

}
