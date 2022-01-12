import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  titleplaylist = this.route.snapshot.paramMap.get('playlist');
  playlist : any[]=[];

  constructor(private msgservice: MessageService,
              private route: ActivatedRoute,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('WatchIt - ' + this.titleplaylist);
    const data = {
      name: this.titleplaylist
    };
    this.msgservice.sendMessage( environment.debutUrlPlaylist + '/getVideosOfPlaylist', data).subscribe(
      reponse => {
        this.playlist = reponse.data;
        for (let i = 0 ; i < this.playlist.length ; i++){
          this.playlist[i].date = (this.playlist[i].date.split('T'))[0];
          const times = this.playlist[i].date.split('-');
          this.playlist[i].date = times[2] + '-' + times[1] + '-' + times[0];
        }
      });
  }

  onDeleteVideo(deleteVideoId: any): void {
    let index = -1;
    let found = false;
    if (deleteVideoId !== ''){
      for (let i = 0 ; i < this.playlist.length && !found; i++){
        if (this.playlist[i].id === deleteVideoId){
          index = i;
          found = true;
        }
      }
      if (index !== -1) {
        this.playlist.splice(index, 1);
      }
    }
  }

}
