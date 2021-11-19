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
  password = '';
  newpassword ='';
  confnewpassword = '';
  errorMessage = "";
  firstName = "";
  lastName = "";
  nationality = "";

  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  affichage(): void {
    // this.msgservice.sendMessage( environment.debutUrlUser + '/updateAccount', data).subscribe(
    //   reponse => {
    //     if(reponse.status == "ok"){
    //       this.errorMessage='';
    //       console.log("ok");
    //     }
    //     else{
    //       this.errorMessage == "Un problème est survenu"
    //     }
    //   })
  }

}
