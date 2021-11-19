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
  oldPassword  = '';
  newPassword  ='';
  confnewpassword = '';
  newFirstName  = "";
  newLastName  = "";
  newNationality  = "";
  errorMessagegauche = "";
  checkMessagegauche = "";
  errorMessagedroit = "";
  checkMessagedroit = "";
  firstName= "";
  lastName= "";
  nationality="";

  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const data = {};
    this.msgservice.sendMessage( environment.debutUrlUser + '/getUserInformations', data).subscribe(
      reponse => {
        if(reponse.status == "ok"){
          console.log(reponse.data);
          this.firstName= reponse.data.firstName;
          this.lastName= reponse.data.lastName;
          this.nationality= reponse.data.nationality;
        }
      });
  }

  affichagegauche(): void {
    if (this.newPassword != ''){
    }
    else{
      const data = {
        newFirstName: this.newFirstName,
        newLastName: this.newLastName,
        newNationality: this.newNationality,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      this.msgservice.sendMessage( environment.debutUrlUser + '/updateAccount', data).subscribe(
        reponse => {
          if(reponse.status == "ok"){
            this.errorMessagegauche='';
            this.checkMessagegauche="Informations enregistrees";
            console.log('ok');
          }
          else{
            this.errorMessagegauche = "Un problème est survenu"
            this.checkMessagegauche='';
          }
        })
    }
    
  }

  affichagedroit(): void {
    if (this.newPassword != this.confnewpassword){
      this.errorMessagedroit="les deux nouveaux mot de passe ne sont pas égaux";
    }
    else{
      const data = {
        newFirstName: this.newFirstName,
        newLastName: this.newLastName,
        newNationality: this.newNationality,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      this.msgservice.sendMessage( environment.debutUrlUser + '/updateAccount', data).subscribe(
        reponse => {
          if(reponse.status == "ok"){
            this.errorMessagedroit='';
            this.checkMessagedroit="Informations enregistrees";
          }
          else{
            this.errorMessagedroit = "Un problème est survenu"
            this.checkMessagedroit ='';
          }
        })
    }
    
  }

}
