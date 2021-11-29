import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit {
  imageAnnonce: File = null;

  constructor(private msgservice: MessageService) { }

  ngOnInit(): void {
  }
  onFileSelected(event): void{
    this.imageAnnonce = event.target.files[0];
  }

  uploadImage(): void{
    const data = new FormData();
    data.append('Image', this.imageAnnonce);
    this.msgservice.sendMessage(environment.debutUrlAdverts + '/sendImage', data).subscribe((res: any) => {
        console.log(res);
      });
  }

}
