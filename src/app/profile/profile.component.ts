import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {IpService} from "../ip.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userBiography = 'Some info about user';

  isChangingName = false;
  isChangingBiography = false;
  isAddingInterests = false;
  isAddingLanguage = false;
  isAddingHeight = false;
  isAddingWeight = false;
  isAddingBodyType = false;
  isAddingEyeColor = false;
  isAddingHairColor = false;
  isAddingSmokingAttention = false;
  isAddingDrinkingAttention = false;

  allLanguages = [
    'German',
    'English',
    'Russian',
    'Belarusian',
  ];
  allHeights = [
    '170',
    '171',
    '172',
    '173',
    '174',
    '175',
    '176',
    '177',
    '178',
    '179',
    '180',
    '181',
    '182',
    '183',
    '184',
    '185',
    '186',
    '187',
    '188',
    '189',
    '190',
    '191',
  ];
  allWeights = [
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '60',
  ];
  allInterests = [
    'Interest#1',
    'Interest#2',
    'Interest#3',
    'Interest#4',
    'Interest#5',
    'Interest#6',
    'Interest#7',
    'Interest#8',
    'Interest#9',
    'Interest#10',
    'Interest#11',
    'Interest#12',
    'Interest#13',
    'Interest#14',
  ];
  allBodyTypes = [
    'strong',
    'really strong',
    'super strong',
    'so much strong',
    'rly ** strong',
  ];
  allEyeColors = [
    'green',
    'brown',
    'blue',
    'yellow',
    'red',
    'black',
  ];
  allHairColors = [
    'pink',
    'tornadoColor',
    'spiderColor',
    'orangeColor',
    'scienceColor',
  ];
  allSmokingAttentions = [
    'very negative',
    'negative',
    'neutral',
    'positive',
    'very positive',
  ];
  allDrinkingAttentions = [
    'very negative',
    'negative',
    'neutral',
    'positive',
    'very positive',
  ];

  name = 'Not Selected';
  userInterests = [];
  userLanguages = [];
  userHeight:string = '';
  userWeight:string = '';
  userBodyType:string = '';
  userEyeColor:string = '';
  userHairColor:string = '';
  userSmokingAttention:string = '';
  userDrinkingAttention:string = '';
  userPhotos = [];

  sendToServer = {
    userPhotos: this.userPhotos,
    userBiography: this.userBiography,
    userName: this.name,
    userHeight: this.userHeight,
    userLanguages: this.userLanguages,
    userInterests: this.userInterests,
    userWeight: this.userWeight,
    userBodyType: this.userBodyType,
    userHairColor: this.userHairColor,
    userEyeColor: this.userEyeColor,
    userSmokingAttention: this.userSmokingAttention,
    userDrinkingAttention: this.userDrinkingAttention,
  };

  file: File;
  editProfile(){
    this.ipService.editTest('editProfile', this.sendToServer, function (data) {
      console.log(data);
    });
  }

  onClickShowInputBiography(){
    this.isChangingBiography = true;
  }

  onClickShowInputName(){
    this.isChangingName = true;
  }

  onClickShowInterests(){
    this.isAddingInterests = true;
  }

  onClickShowAllLanguages(){
    this.isAddingLanguage = true;
  }
  onClickShowAllHeights(){
    this.isAddingHeight = true;
  }
  onClickShowAllWeights(){
    this.isAddingWeight = true;
  }
  onClickShowAllBodyTypes(){
    this.isAddingBodyType = true;
  }
  onClickShowAllEyeColors(){
    this.isAddingEyeColor = true;
  }
  onClickShowAllHairColors(){
    this.isAddingHairColor = true;
    console.log(this.sendToServer)
  }
  onClickShowAllSmokingAttentions(){
    this.isAddingSmokingAttention = true;
  }
  onClickShowAllDrinkingAttentions(){
    this.isAddingDrinkingAttention = true;
  }

  onChangeUserBiography(){
    this.userBiography = (<HTMLInputElement>document.getElementById('userBiography')).value;
    this.isChangingBiography = false;
    this.sendToServer.userBiography = this.userBiography;
  }

  onChangeName(){
    this.name = (<HTMLInputElement>document.getElementById('changeName')).value;
    this.isChangingName = false;
    this.sendToServer.userName = this.name;
  }

  addInterest(event){
    this.allInterests.forEach((value, index)=>{
      if(value === event.target.textContent){
        this.userInterests.unshift({
          interest: value,
          indexInAllInterests: index,
        });
        this.sendToServer.userInterests = this.userInterests;
        this.allInterests.splice(index, 1);
        this.isAddingInterests = false;
      }
    });
  }
  addLanguage(event){
    this.allLanguages.forEach((value, index)=>{
      if(value === event.target.textContent){
        this.userLanguages.unshift({
          language: value,
          indexInAllLanguages: index,
        });
        this.sendToServer.userLanguages = this.userLanguages;
        this.allLanguages.splice(index, 1);
        this.isAddingLanguage = false;
      }

    });
  }
  addHeight(event){
    let height = event.target.textContent;
    this.allHeights.forEach((value)=>{

      if(value === height){
        this.userHeight = value;
        this.isAddingHeight = false;
        this.sendToServer.userHeight = this.userHeight;
      }
    });
  }
  addWeight(event){
    let weight = event.target.textContent;
    this.allWeights.forEach((value)=>{

      if(value === weight){
        this.userWeight = value;
        this.isAddingWeight = false;
        this.sendToServer.userWeight = this.userWeight;
      }
    });
  }
  addBodyType(event){
    let bodyType = event.target.textContent;
    this.allBodyTypes.forEach((value)=>{
      if(value === bodyType){
        this.userBodyType = value;
        this.isAddingBodyType = false;
        this.sendToServer.userBodyType = this.userBodyType;
      }
    });
  }

  addEyeColor(event){
    let eyeColor = event.target.textContent;
    this.allEyeColors.forEach((value)=>{
      if(value === eyeColor){
        this.userEyeColor = value;
        this.isAddingEyeColor = false;
        this.sendToServer.userEyeColor = this.userEyeColor;
      }
    });
  }

  addHairColor(event){
    let hairColor = event.target.textContent;
    this.allHairColors.forEach((value)=>{
      if(value === hairColor){
        this.userHairColor = value;
        this.isAddingHairColor = false;
        this.sendToServer.userHairColor = this.userHairColor;
      }
    });
  }

  addSmokingAttention(event){
    let smoking = event.target.textContent;
    this.allSmokingAttentions.forEach((value)=>{
      if(value === smoking){
        this.userSmokingAttention = value;
        this.isAddingSmokingAttention = false;
        this.sendToServer.userSmokingAttention = this.userSmokingAttention;
      }
    });
  }

  addDrinkingAttention(event){
    let drinking = event.target.textContent;
    this.allDrinkingAttentions.forEach((value)=>{
      if(value === drinking){
        this.userDrinkingAttention = value;
        this.isAddingDrinkingAttention = false;
        this.sendToServer.userDrinkingAttention = this.userDrinkingAttention;
      }
    });
  }


  deleteUserInterest(event){
    let interest = event.target.textContent;
    let index = event.target.dataset.target;
    this.allInterests.splice(index, 0, interest);
    this.userInterests.forEach((value, index)=>{
      if(value.interest === interest){
        this.userInterests.splice(index, 1);
        this.sendToServer.userInterests.splice(index, 1);
      }
    });
    event.target.remove();
  }
  deleteUserLanguage(event){
    let language = event.target.textContent;
    let index = event.target.dataset.target;
    this.allLanguages.splice(index, 0, language);
    this.allLanguages.sort();
    this.userLanguages.forEach((value, index)=>{
      if(value.language === language){
        this.userLanguages.splice(index, 1);
        this.sendToServer.userLanguages.splice(index, 1);
      }
    });
  }



  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    let _this = this;
    let reader  = new FileReader();

    reader.addEventListener("load", function () {
      _this.userPhotos.unshift(reader.result);
      _this.sendToServer.userPhotos = _this.userPhotos;
      let typeArr = Int16Array.from(reader.result);
      let blob = new Blob([typeArr], {type: 'application/octet-stream'}); // pass a useful mime type here
      let url = window.URL.createObjectURL(blob);
      console.log(url);
      let testImg = document.createElement('img');
      testImg.src = url;
      document.getElementById('mydiv').appendChild(testImg);

    }, false);

    if (this.file) {
      reader.readAsDataURL(this.file);
    }
  }

  constructor(private ipService: IpService) {

  }


  ngOnInit() {
    let _this = this;
    this.ipService.editTest('getUserData', null, function (data) {
      console.log(data);
      _this.userHeight = data.userHeight;
      _this.userWeight = data.userWeight;
      _this.userEyeColor = data.userEyeColor;
      _this.userBodyType = data.userBodyType;
      _this.userHairColor = data.userHairColor;
      _this.userSmokingAttention = data.userSmokingAttention;
      _this.userDrinkingAttention = data.userDrinkingAttention;
      _this.name = data.userName;
      _this.userInterests = data.userInterests;
      _this.userLanguages = data.userLanguages;
      _this.userPhotos = data.userPhotos;
      _this.sendToServer = {
        userPhotos: _this.userPhotos,
        userBiography: _this.userBiography,
        userName: _this.name,
        userHeight: _this.userHeight,
        userLanguages: _this.userLanguages,
        userInterests: _this.userInterests,
        userWeight: _this.userWeight,
        userBodyType: _this.userBodyType,
        userHairColor: _this.userHairColor,
        userEyeColor: _this.userEyeColor,
        userSmokingAttention: _this.userSmokingAttention,
        userDrinkingAttention: _this.userDrinkingAttention,
      };
      _this.userLanguages.forEach((value)=>{
        let userLanguage = value.language;
        _this.allLanguages.forEach((value,index)=>{
          if (value === userLanguage){
            _this.allLanguages.splice(index, 1);
          }
        })
      });
      _this.userInterests.forEach((value, index)=>{
        let userInterest = value.interest,
          indexToSplice = index;
        _this.allInterests.forEach((value,index)=>{
          if (value === userInterest){
            _this.allInterests.splice(index, 1);
          }
        })
      });
    });
  }

}
