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
      email: loginUser,
      password: passwordUser
    };
    return this.msgservice.sendMessage(environment.debutUrlUser + '/checkLogin', data);
  }

  finalizeAuthentication(reponse: Phpdata): void{
    if (reponse.status === 'ok'){
      this.isAuthenticated = true;
      localStorage.setItem('profile', reponse.data);
    }
    else {
      this.isAuthenticated = false;
    }
  }
}
