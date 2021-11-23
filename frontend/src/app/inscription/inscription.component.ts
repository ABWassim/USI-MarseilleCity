import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  firstName = '';
  lastName = '';
  nationality = '';

  constructor(private authservice: AuthService, private router: Router, private msgservice: MessageService) { }

  ngOnInit(): void {
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
          if (reponse.status === 'ok'){
            this.errorMessage = '';
            this.router.navigateByUrl('/home');
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
    console.log(this.email);
    if (!reg.test(this.email)){
      this.errorMessage = "Le format de l'adresse mail est invalide";
      return false;
    }
    if (this.password.length < 8){
      this.errorMessage = "Le mot de passe doit contenir au minimum 8 caractères";
      return false;
    }
    return true;
  }

}
