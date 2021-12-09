import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.scss']
})
export class AdvertiserComponent implements OnInit {
  firstName = '';
  lastName = '';
  nationality = '';
  company = '';
  newFirstName = '';
  newLastName = '';
  newNationality = '';
  newCompany = '';
  oldPassword = '';
  newPassword = '';
  confNewPassword = '';
  errorMessagegauche = '';
  checkMessagegauche = '';
  errorMessagedroit = '';
  checkMessagedroit = '';

  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const data = {};
    this.msgservice.sendMessage( environment.debutUrlUser + '/getAdvertInformations', data).subscribe( //changer la route
      reponse => {
        if (reponse.status === 'ok'){
          this.firstName = reponse.data.firstName;
          this.lastName = reponse.data.lastName;
          this.nationality = reponse.data.nationality;
          this.company = reponse.data.company;
        }
      });
  }

  modifierInfosPersos(): void {
    if (this.newFirstName === '' && this.newLastName === '' && this.newNationality === '' && this.newCompany === ''){
      this.errorMessagegauche = 'Veuillez spécifier au moins un champ';
      return;
    }
    const data = {
        newFirstName: this.newFirstName,
        newLastName: this.newLastName,
        newNationality: this.newNationality,
        newCompany: this.newCompany,
        oldPassword: '',
        newPassword: ''
      };
    this.msgservice.sendMessage( environment.debutUrlUser + '/updateAdvertAccount', data).subscribe(
      reponse => {
        if (reponse.status === 'ok'){
          this.errorMessagegauche = '';
          this.checkMessagegauche = 'Informations enregistrées';
        }
        else {
          this.errorMessagegauche = 'Un problème est survenu, veuillez ressayer plus tard';
          this.checkMessagegauche = '';
        }
      });
  }

  modifierMDP(): void {
    if (this.oldPassword !== '' && this.newPassword === ''){
      this.errorMessagedroit = 'Veuillez spécifier votre ancien mot de passe';
      return;
    }
    if (this.newPassword !== this.confNewPassword){
      this.errorMessagedroit = 'Le nouveau mot de passe et sa confirmation sont différents';
      return;
    }
    if (this.newPassword.length < 8){
      this.errorMessagedroit = 'Le nouveau mot de passe doit contenir au moins 8 caractères';
      return;
    }

    const data = {
      newFirstName: '',
      newLastName: '',
      newNationality: '',
      newCompany: '',
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };
    this.msgservice.sendMessage( environment.debutUrlUser + '/updateAdvertAccount', data).subscribe(
      reponse => {
        if (reponse.status === 'ok'){
          this.errorMessagedroit = '' ;
          this.checkMessagedroit = 'Le mot de passe a bien été modifié';
        }
        else {
          if (reponse.data.reason === 'Old password incorrect'){
            this.errorMessagedroit = "L'ancien mot de passe est incorrect";
            this.checkMessagedroit = '';
          }
          else {
            this.errorMessagedroit = "Un problème est survenu, veuillez ressayer plus tard";
            this.checkMessagedroit = '';
          }
        }
      });
  }

  countrySelected(event: any): void{
    this.newNationality = event.alpha3Code;
  }
}
