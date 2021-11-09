import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mail = '';
  password = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  affichage(): void {
    if (this.mail != '' && this.password != ''){
      this.router.navigateByUrl('/home');
    }
  }
}
