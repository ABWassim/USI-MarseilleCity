import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteVideoDialogComponent} from '../delete-video-dialog/delete-video-dialog.component';

@Component({
  selector: 'app-delete-video',
  templateUrl: './delete-video.component.html',
  styleUrls: ['./delete-video.component.scss']
})
export class DeleteVideoComponent implements OnInit {
  @Input() videoId = '';
  @Input() playlistName = '';
  @Input() videoTitle = '';
  @Output() newItemEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(DeleteVideoDialogComponent, {
      data: {
        videoId: this.videoId,
        videoTitle: this.videoTitle,
        playlistName: this.playlistName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newItemEvent.emit(result);
    });
  }

}
