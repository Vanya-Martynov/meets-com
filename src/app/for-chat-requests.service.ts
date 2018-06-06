import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { fromPromise } from 'rxjs/observable/fromPromise';

// Subscribe to begin listening for async result




@Injectable()
export class ForChatRequestsService {

  httpURL = 'http://localhost:8010/';
  data = fromPromise(fetch('/api/endpoint'));

  constructor(private http: HttpClient) {

  }

  obsPromises(){
    this.data.subscribe({
      next(response) { console.log(response); },
      error(err) { console.error('Error: ' + err); },
      complete() { console.log('Completed'); }
    });
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
