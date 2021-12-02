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

}
