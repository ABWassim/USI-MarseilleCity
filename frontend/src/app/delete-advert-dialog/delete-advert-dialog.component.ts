import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../message.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-delete-advert-dialog',
  templateUrl: './delete-advert-dialog.component.html',
  styleUrls: ['./delete-advert-dialog.component.scss']
})
export class DeleteAdvertDialogComponent implements OnInit {

  advertTitle = this.data.advertTitle;

  constructor(public dialogRef: MatDialogRef<DeleteAdvertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(MessageService) private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close('');
  }

  onClick(): void {
    const data = {
      title: this.advertTitle,
    };

    this.messageService.sendMessage( environment.debutUrlAdverts + '/deleteAdvert', data).subscribe(
      retour => {
        if (retour.status === 'ok'){
          this.dialogRef.close(this.advertTitle);
        }
        else {
          this.dialogRef.close('');
        }
      }
    );
  }

}
