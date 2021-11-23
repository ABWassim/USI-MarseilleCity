import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../message.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-delete-video-dialog',
  templateUrl: './delete-video-dialog.component.html',
  styleUrls: ['./delete-video-dialog.component.scss']
})
export class DeleteVideoDialogComponent implements OnInit {

  videoTitle = this.data.videoTitle;

  constructor(public dialogRef: MatDialogRef<DeleteVideoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(MessageService) private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close('');
  }

  onClick(): void {
    const data = {
      name: this.data.playlistName,
      videoId: this.data.videoId
    };

    this.messageService.sendMessage( environment.debutUrlPlaylist + '/deleteVideo', data).subscribe(
      retour => {
        if (retour.status === 'ok'){
          this.dialogRef.close(this.data.videoId);
        }
        else {
          this.dialogRef.close('');
        }
      }
    );
  }
}
