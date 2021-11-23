import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  firstName = '';
  lastName = '';
  nationality = '';
  newFirstName = '';
  newLastName = '';
  newNationality = '';
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
    this.msgservice.sendMessage( environment.debutUrlUser + '/getUserInformations', data).subscribe(
      reponse => {
        if (reponse.status === 'ok'){
          this.firstName = reponse.data.firstName;
          this.lastName = reponse.data.lastName;
          this.nationality = reponse.data.nationality;
        }
      });
  }

  modifierInfosPersos(): void {
    if (this.newFirstName === '' && this.newLastName === '' && this.newNationality === ''){
      this.errorMessagegauche = 'Veuillez spécifier au moins un champ';
      return;
    }
    const data = {
        newFirstName: this.newFirstName,
        newLastName: this.newLastName,
        newNationality: this.newNationality,
        oldPassword: '',
        newPassword: ''
      };
    this.msgservice.sendMessage( environment.debutUrlUser + '/updateAccount', data).subscribe(
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
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };
    this.msgservice.sendMessage( environment.debutUrlUser + '/updateAccount', data).subscribe(
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
}

