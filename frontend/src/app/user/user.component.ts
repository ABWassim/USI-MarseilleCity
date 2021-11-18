import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  password = '';
  newpassword ='';
  confnewpassword = '';
  errorMessage = "";
  firstName = "";
  lastName = "";
  nationality = "";

  constructor() { }

  ngOnInit(): void {
  }

  affichage(): void {
    console.log(this.password);
  }

}
