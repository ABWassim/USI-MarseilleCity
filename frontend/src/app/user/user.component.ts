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
  errorMessage = "";
  newFirstName  = "";
  newLastName  = "";
  newNationality  = "";

  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  affichage(): void {
    if (this.newPassword != this.confnewpassword){
      this.errorMessage="les deux nouveaux mot de passe ne sont pas égaux";
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
            this.errorMessage="Informations enregistrer";
            console.log('ok');
          }
          else{
            this.errorMessage == "Un problème est survenu"
          }
        })
    }
    
  }

}
