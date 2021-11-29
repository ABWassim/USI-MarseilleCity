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
  email = '';
  password = '';
  errorMessage = "";
  phpData: Phpdata = {status: '', data: null};

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  affichage(): void {
    if (this.checkInputs()){
      this.authservice.sendAuthentication(this.email, this.password).subscribe(
        reponse => {
          this.authservice.finalizeAuthentication(reponse);
          if (this.authservice.isAuthenticated){
            this.errorMessage = '';
            if (reponse.data === 0){
              this.router.navigateByUrl('/search');
            }
            else {
              this.router.navigateByUrl('/advert');
            }
          }
          else {
            if (reponse.data.reason === 'Wrong mail/password combination'){
              this.errorMessage = "Le nom d'utilisateur ou le mot de passe est incorrect";
            }
            else if (reponse.data.reason === 'Account suspended'){
              this.errorMessage = "Votre compte a été suspendu";
            }
            else {
              this.errorMessage = "L'authentification n'a pas pu aboutir, veuillez ressayer plus tard";
            }
          }
        }
      );
    }
  }

  checkInputs(): boolean {
    const reg = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    console.log(this.email);
    if (!reg.test(this.email)){
      this.errorMessage = "Le format de l'adresse mail est invalide";
      return false;
    }
    return true;
  }

}
