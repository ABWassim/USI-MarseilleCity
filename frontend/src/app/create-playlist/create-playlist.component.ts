import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';

export interface NewPlaylist {
  nom_nouvelle_playlist: string;
}

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent{
  @Output() newItemEvent = new EventEmitter<any>();
  constructor(public dialog: MatDialog) {}

  buttonClick(): void {
    const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newItemEvent.emit(result);
    });
  }
}
