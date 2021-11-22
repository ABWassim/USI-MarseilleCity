import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeletePlaylistDialogComponent} from "../delete-playlist-dialog/delete-playlist-dialog.component";

@Component({
  selector: 'app-delete-playlist',
  templateUrl: './delete-playlist.component.html',
  styleUrls: ['./delete-playlist.component.scss']
})
export class DeletePlaylistComponent implements OnInit {

  @Input() playlistName = '';
  @Output() newItemEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(DeletePlaylistDialogComponent, {
      data: {
        playlistName: this.playlistName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newItemEvent.emit(result);
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
