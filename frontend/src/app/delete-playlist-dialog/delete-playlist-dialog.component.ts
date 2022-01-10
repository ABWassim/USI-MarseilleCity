import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-delete-playlist-dialog',
  templateUrl: './delete-playlist-dialog.component.html',
  styleUrls: ['./delete-playlist-dialog.component.scss']
})
export class DeletePlaylistDialogComponent {

  playlistName = this.data.playlistName;
  onSendRequest = false;

  constructor(public dialogRef: MatDialogRef<DeletePlaylistDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(MessageService) private messageService: MessageService) { }

  onNoClick(): void {
    this.dialogRef.close('');
  }

  onClick(): void {
    this.onSendRequest = true;
    const data = {
      name: this.playlistName,
    };

    this.messageService.sendMessage( environment.debutUrlPlaylist + '/deletePlaylist', data).subscribe(
      retour => {
        if (retour.status === 'ok'){
          this.dialogRef.close(this.playlistName);
        }
        else {
          this.dialogRef.close('');
        }
      }
    );
  }
}
