import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  mosheUser: User = {
    username: 'moshe',
    displayName: 'Moshe Shein :)',
    mainPage: {
      leftImg: '#ff0000',
      rightImg: '#00ff00'
    }
  };

  aviUser: User = {
    username: 'avi',
    displayName: 'Avi Mizrahi',
    mainPage: {
      leftImg: '#0000ff',
      rightImg: '#0f0f00'
    }
  }

  users = {
    moshe: <User> this.mosheUser,
    avi: <User> this.aviUser,
    empty: <User> new User()
  }

  public currentUser: Subject<User> = new Subject();

  constructor() { }

  getUsername(username: string): User {
    switch (username) {
      case 'moshe':
      case 'avi':
        this.currentUser.next(this.users[username]);
        return this.users[username];
    }
    return new User();
    // return this.users[username] || new User();
    // return this.users['moshe'] || new User()
  }
}
