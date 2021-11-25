import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserqueryService {
  query = '';
  pageNumber = -1;

  constructor() { }
}
