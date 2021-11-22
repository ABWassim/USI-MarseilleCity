import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-create-playlist-dialog',
  templateUrl: './create-playlist-dialog.component.html',
  styleUrls: ['./create-playlist-dialog.component.scss']
})
export class CreatePlaylistDialogComponent {
  nom_nouvelle_playlist = '';
  errorMessage = '';

  constructor(public dialogRef: MatDialogRef<CreatePlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MessageService) private messageService: MessageService) { }

  onNoClick(): void {
    this.dialogRef.close('');
  }

  onClick(): void {
    if (this.nom_nouvelle_playlist === ''){
      this.errorMessage = 'Le nom de la nouvelle playlist est vide';
    }
    else {
      const data = {
        name: this.nom_nouvelle_playlist,
      };
      this.messageService.sendMessage( environment.debutUrlPlaylist + '/addPlaylist', data).subscribe(
        retour => {
          if (retour.status === 'ok'){
            this.errorMessage = '';
            this.dialogRef.close(this.nom_nouvelle_playlist);
          }
          else {
            this.errorMessage = 'La playlist existe déjà';
          }
        }
      );
    }
  }
}
