import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class IpService {
  port = 3000;
  httpURL = 'http://localhost:8010/';
  newUser ={
    email: undefined,
    phone: undefined,
    age: undefined,
    location: undefined,
    photo: undefined,
    password: undefined,
    gender: undefined,
    name: undefined,
    hash: undefined,
  };

  constructor(private http: HttpClient) {


  }

  createNewUser(url, someData):void {
    let request = this.http.post(this.httpURL + url, someData)
      .subscribe(data=>{
        console.log(data);
      }, err =>{
        console.log(err)
      })

  }
}
