import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeletePlaylistDialogComponent} from "../delete-playlist-dialog/delete-playlist-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAdvertDialogComponent} from "../delete-advert-dialog/delete-advert-dialog.component";

@Component({
  selector: 'app-delete-advert',
  templateUrl: './delete-advert.component.html',
  styleUrls: ['./delete-advert.component.scss']
})
export class DeleteAdvertComponent {

  @Input() advertTitle = '';
  @Output() newItemEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  openDialog(): void{
    const dialogRef = this.dialog.open(DeleteAdvertDialogComponent, {
      data: {
        advertTitle: this.advertTitle
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newItemEvent.emit(result);
    });
  }

}
