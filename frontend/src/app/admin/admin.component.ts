import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  user: any;

  constructor(private msgservice: MessageService, private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit(): void {
    const data = {};
    this.msgservice.sendMessage( environment.debutUrlUser + '/getUsers', data).subscribe(
      reponse => {
        this.users = reponse.data;
        console.log(this.users);
      }
    );
  }

  buttonClick(email1, valid1) : void{
    const data ={
      email : email1,
      valid : valid1
    }
    this.msgservice.sendMessage( environment.debutUrlUser + '/changeStatusAccount', data).subscribe(
      reponse => {
        this.user = reponse.data;
        console.log(this.user);
      }
    );
    console.log("ok");
    this.ngOnInit();
  }

}
