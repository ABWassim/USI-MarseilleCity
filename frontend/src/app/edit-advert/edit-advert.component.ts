import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditAdvertDialogComponent} from "../edit-advert-dialog/edit-advert-dialog.component";

@Component({
  selector: 'app-edit-advert',
  templateUrl: './edit-advert.component.html',
  styleUrls: ['./edit-advert.component.scss']
})
export class EditAdvertComponent {
  @Input() oldTitle = '';
  @Output() newItemEvent = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditAdvertDialogComponent, {
      data: {
        oldTitle: this.oldTitle
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newItemEvent.emit(result);
    });
  }
}
