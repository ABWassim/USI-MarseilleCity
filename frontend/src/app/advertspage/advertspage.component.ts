import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-advertspage',
  templateUrl: './advertspage.component.html',
  styleUrls: ['./advertspage.component.scss']
})
export class AdvertspageComponent implements OnInit {
  adverts: any[] = [];

  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const data = {};
    this.msgservice.sendMessage( environment.debutUrlAdverts + '/getAdverts', data).subscribe(
      reponse => {
        this.adverts = reponse.data;
        console.log(this.adverts);
      }
    );
  }

  onCreateAdvert(newAdvert: any): void {
    if (newAdvert !== ''){
      this.adverts.unshift(newAdvert);
    }
  }

  onDeleteAdvert(oldAdvert: any): void{
    if (oldAdvert !== ''){
      let trouve = false;
      let i = 0;
      while (i < this.adverts.length && !trouve){
        if (this.adverts[i].title === oldAdvert){
          trouve = true;
        }
        else {
          i++;
        }
      }
      if (i !== this.adverts.length){
        this.adverts.splice(i, 1);
      }
    }
  }

  onEditPlaylist(bow: any): void {
  }
}
