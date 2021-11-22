import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-playlistpage',
  templateUrl: './playlistpage.component.html',
  styleUrls: ['./playlistpage.component.scss']
})
export class PlaylistpageComponent implements OnInit {
  playlists: string[] = [];

  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const data = {};
    this.msgservice.sendMessage( environment.debutUrlPlaylist + '/getPlaylists', data).subscribe(
      reponse => {
        this.playlists = reponse.data;
        console.log(this.playlists);
      }
    );
  }

  onCreatePlaylist(newPlaylist: any): void {
    const name = newPlaylist;
    if (name !== ''){
      this.playlists.unshift(name);
    }
  }

  onDeletePlaylist(oldPlaylist: any): void {
    if (oldPlaylist !== ''){
      const index: number = this.playlists.indexOf(oldPlaylist);
      if (index !== -1) {
        this.playlists.splice(index, 1);
      }
    }
  }

}
