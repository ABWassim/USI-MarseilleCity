import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-edit-playlist-dialog',
  templateUrl: './edit-playlist-dialog.component.html',
  styleUrls: ['./edit-playlist-dialog.component.scss']
})
export class EditPlaylistDialogComponent {
  nom_nouvelle_playlist:string;
  old_name= this.data.playlistName;
  errorMessage: string;

  constructor(public dialogRef: MatDialogRef<EditPlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MessageService) private messageService: MessageService) { }

  onNoClick(): void {
    this.dialogRef.close('');
  }

  onClick(): void {
    const data = {
      nameOld: this.old_name,
      nameNew: this.nom_nouvelle_playlist
    };
    this.messageService.sendMessage( environment.debutUrlPlaylist + '/renamePlaylist', data).subscribe(
      retour => {
        if (retour.status === 'ok'){
          this.errorMessage = '';
          this.dialogRef.close(retour.data);
        }
        else {
          if (this.nom_nouvelle_playlist === ''){
            this.errorMessage = 'Le nouveau nom de la playlist est vide';
          }
          else {
            this.errorMessage = 'Le nom de playlist existe déjà';
          }
        }
      }
    );
  }
}
