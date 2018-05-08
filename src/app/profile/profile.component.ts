import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name = 'Not Selected';

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

  file: File;

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
  }

  onChangeName(){
    this.name = (<HTMLInputElement>document.getElementById('changeName')).value;
    this.isChangingName = false;
  }

  addInterest(event){
    this.allInterests.forEach((value, index)=>{
      if(value === event.target.textContent){
        this.userInterests.unshift({
          interest: value,
          indexInAllInterests: index,
        });
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
      }
    });
  }
  addWeight(event){
    let weight = event.target.textContent;
    this.allWeights.forEach((value)=>{

      if(value === weight){
        this.userWeight = value;
        this.isAddingWeight = false;
      }
    });
  }
  addBodyType(event){
    let bodyType = event.target.textContent;
    this.allBodyTypes.forEach((value)=>{
      if(value === bodyType){
        this.userBodyType = value;
        this.isAddingBodyType = false;
      }
    });
  }

  addEyeColor(event){
    let eyeColor = event.target.textContent;
    this.allEyeColors.forEach((value)=>{
      if(value === eyeColor){
        this.userEyeColor = value;
        this.isAddingEyeColor = false;
      }
    });
  }

  addHairColor(event){
    let hairColor = event.target.textContent;
    this.allHairColors.forEach((value)=>{
      if(value === hairColor){
        this.userHairColor = value;
        this.isAddingHairColor = false;
      }
    });
  }

  addSmokingAttention(event){
    let smoking = event.target.textContent;
    this.allSmokingAttentions.forEach((value)=>{
      if(value === smoking){
        this.userSmokingAttention = value;
        this.isAddingSmokingAttention = false;
      }
    });
  }

  addDrinkingAttention(event){
    let drinking = event.target.textContent;
    this.allDrinkingAttentions.forEach((value)=>{
      if(value === drinking){
        this.userDrinkingAttention = value;
        this.isAddingDrinkingAttention = false;
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
      //_this.ipService.newUser.photo = reader.result;
      //console.log(_this.ipService.newUser);
      _this.userPhotos.unshift(reader.result);
    }, false);

    if (this.file) {
      reader.readAsDataURL(this.file);
    }
  }

  constructor() {

  }


  ngOnInit() {
  }

}
