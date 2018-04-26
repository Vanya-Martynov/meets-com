import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class IpService {
  port = 3000;
  httpURL = 'http://localhost:8010/';
  constructor(private http: HttpClient) {


  }


  getHero():void {
    let request = this.http.get(this.httpURL)
      .subscribe(data=>{
        console.log(data);
      }, err =>{
        console.log(err)
      })

  }
}
