import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';
import { Video } from '../video/video.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  titleplaylist = this.route.snapshot.paramMap.get('playlist');
  playlist : Video[]=[];

  constructor(private msgservice: MessageService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const data = {
      name: this.titleplaylist
    };
    this.msgservice.sendMessage( environment.debutUrlPlaylist + '/getVideosOfPlaylist', data).subscribe(
      reponse => {
        this.playlist = reponse.data;
      })
      console.log(this.playlist);
      console.log(this.titleplaylist);
  }

}
