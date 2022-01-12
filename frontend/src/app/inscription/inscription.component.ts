import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  email = '';
  password = '';
  confPassword = '';
  errorMessage = '';
  firstName = '';
  lastName = '';
  nationality = '';

  constructor(private authservice: AuthService, private router: Router, private msgservice: MessageService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("WatchIt - S'inscrire");
  }

  affichage(): void {
    if (this.checkInputs()){
      const data = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        nationality: this.nationality
      };
      this.msgservice.sendMessage( environment.debutUrlUser + '/createAccount', data).subscribe(
        reponse => {
          this.authservice.finalizeAuthentication(reponse);
          if (reponse.status === 'ok'){
            this.errorMessage = '';
            this.router.navigateByUrl('/search');
          }
          else {
            if (reponse.data.reason === 'Email already used'){
              this.errorMessage = "Cette adresse email est déjà associée à un compte";
            }
            else {
              this.errorMessage = "L'inscription n'a pas pû aboutir, veuillez ressayer plus tard";
            }
          }
        });
    }
  }

  checkInputs(): boolean {
    const reg = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    if (!reg.test(this.email)){
      this.errorMessage = "Le format de l'adresse mail est invalide";
      return false;
    }
    if (this.password.length < 8){
      this.errorMessage = "Le mot de passe doit contenir au minimum 8 caractères";
      return false;
    }
    if (this.firstName === ''){
      this.errorMessage = "Veuillez rentrer un prénom";
      return false;
    }
    if (this.lastName === ''){
      this.errorMessage = "Veuillez rentrer un nom de famille";
      return false;
    }
    if (this.nationality === ''){
      this.errorMessage = "Veuillez selectionner une nationalité";
      return false;
    }
    if (this.password !== this.confPassword){
      this.errorMessage = "Le mot de passe et sa confirmation sont différents";
      return false;
    }
    return true;
  }

  countrySelected(event: any): void{
    this.nationality = event.alpha3Code;
  }

}
