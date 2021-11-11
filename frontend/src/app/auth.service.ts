import { Injectable } from '@angular/core';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Phpdata} from './phpdata';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;

  constructor(private msgservice: MessageService) { }

  sendAuthentication(loginUser: string, passwordUser: string): Observable<Phpdata>{
    const data = {
      login: loginUser,
      password: passwordUser
    };
    return this.msgservice.sendMessage('checkLogin', data);
  }

  finalizeAuthentication(data: Phpdata): void{
    if (data.status === 'ok'){
      this.isAuthenticated = true;
    }
    else {
      this.isAuthenticated = false;
    }
  }
}
