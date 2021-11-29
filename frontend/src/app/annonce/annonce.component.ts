import { Component, OnInit } from '@angular/core';
import {MessageService} from "../message.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {
  imageAnnonce: File;
  url = 'http://localhost:3003/bow';

  constructor(private msgservice: MessageService) { }

  ngOnInit(): void {
  }

}
