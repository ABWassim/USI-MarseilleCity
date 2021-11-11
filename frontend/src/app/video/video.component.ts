import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../message.service';

export interface Video {
  title: string;
  urlVideo : string;
  channel : string;
  urlChannel : string;
  date : Date;
  thumbnail : string;
  description : string;
  platform : string;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {
  listeVideos: Video[] = [];

  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.msgservice.sendMessage('getVideos', null).subscribe(
      reponse => {
        this.listeVideos = reponse.data;
      }
    );
  }

}
