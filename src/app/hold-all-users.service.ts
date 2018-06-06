import { Injectable } from '@angular/core';

@Injectable()
export class HoldAllUsersService {

  arrayOfUsers: Array<object>;

  constructor() {

  }
  saveAllUsers(users){
    this.arrayOfUsers = users;
  }

}
