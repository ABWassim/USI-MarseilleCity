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
  errorMessage = "";
  firstName = "";
  lastName = "";
  nationality = "";

  constructor(private authservice: AuthService, private router: Router, private msgservice: MessageService) { }

  ngOnInit(): void {
  }

  affichage(): void {
    const data = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      nationality: this.nationality
    };
    this.msgservice.sendMessage( environment.debutUrlUser + '/createAccount', data).subscribe(
      reponse => {
        if (reponse.status == 'ok'){
          this.errorMessage = '';
          this.router.navigateByUrl('/home');
        }
        else {
          this.errorMessage = "L'inscription n'a pas aboutie";
          console.log(reponse.data);
        }
      });
  }
}
