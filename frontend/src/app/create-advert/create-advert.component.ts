import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateAdvertDialogComponent} from "../create-advert-dialog/create-advert-dialog.component";

@Component({
  selector: 'app-create-advert',
  templateUrl: './create-advert.component.html',
  styleUrls: ['./create-advert.component.scss']
})
export class CreateAdvertComponent{

  @Output() newItemEvent = new EventEmitter<any>();
  constructor(public dialog: MatDialog) {}

  buttonClick(): void {
    const dialogRef = this.dialog.open(CreateAdvertDialogComponent, {
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newItemEvent.emit(result);
    });
  }

}
