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
    return this.http.post<Phpdata>(url, data, {withCredentials: true});
  }
}
