import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Phpdata} from './phpdata';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(url: string, data: any): Observable<Phpdata>{
    /*
    const formData = new FormData();

    for (const i in data){
      formData.set(i, data[i]);
    }
    */
    const fullUrl = environment.debutUrl + '/' + url;

    return this.http.post<Phpdata>(fullUrl, data, {withCredentials: true});
  }
}
