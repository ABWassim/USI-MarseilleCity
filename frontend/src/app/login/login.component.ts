import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message.service';
import {Phpdata} from '../phpdata';
import {AuthService} from '../auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = "";
  phpData: Phpdata = {status: '', data: null};

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  affichage(): void {
    this.authservice.sendAuthentication(this.username, this.password).subscribe(
      reponse => {
        this.authservice.finalizeAuthentication(reponse);
        if (this.authservice.isAuthenticated){
          this.errorMessage = '';
          this.router.navigateByUrl('/home');
        }
        else {
          this.errorMessage = "Le nom d'utilisateur ou le mot de passe est incorrect";
        }
      }
    );
  }

}