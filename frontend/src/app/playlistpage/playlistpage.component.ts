import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EditPlaylistDialogComponent } from '../edit-playlist-dialog/edit-playlist-dialog.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-playlistpage',
  templateUrl: './playlistpage.component.html',
  styleUrls: ['./playlistpage.component.scss']
})
export class PlaylistpageComponent implements OnInit {
  playlists: string[] = [];
  @Output() newItemEvent = new EventEmitter<any>();
  new_name_playlist: string;
  
  
  constructor(private msgservice: MessageService, private route: ActivatedRoute,public dialog: MatDialog) { }

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

  onEditPlaylist(newPlaylist: any, oldPlaylist: any): void {
    if (oldPlaylist !== ''){
      const index: number = this.playlists.indexOf(oldPlaylist);
      if (index !== -1) {
        this.playlists.splice(index, 1, newPlaylist);
      }
    }
  }

}
