import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPlaylistDialogComponent } from '../edit-playlist-dialog/edit-playlist-dialog.component';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss']
})
export class EditPlaylistComponent implements OnInit {

  @Input() playlistName = '';
  @Output() newItemEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(EditPlaylistDialogComponent, {
      data: {
        playlistName: this.playlistName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newItemEvent.emit(result);
    });
  }
}
