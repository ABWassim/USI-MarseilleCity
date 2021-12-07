import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../message.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-edit-advert-dialog',
  templateUrl: './edit-advert-dialog.component.html',
  styleUrls: ['./edit-advert-dialog.component.scss']
})
export class EditAdvertDialogComponent implements OnInit {

  nouveauNomAnnonce = '';
  errorMessage = '';
  nouvelleDescription = '';
  imageAnnonce: File = null;
  onSendRequest = false;
  oldTitle = this.data.oldTitle;

  placeholderTitle = '';
  placeholderDescription = '';

  constructor(public dialogRef: MatDialogRef<EditAdvertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(MessageService) private messageService: MessageService) { }

  ngOnInit(): void {
    const data = {
      title: this.oldTitle
    };
    this.messageService.sendMessage( environment.debutUrlAdverts + '/getSpecificAdvert', data).subscribe(
      retour => {
        this.placeholderTitle = retour.data.title;
        this.placeholderDescription = retour.data.description;
      }
    );
  }

  onFileSelected(event): void{
    this.imageAnnonce = event.target.files[0];
  }

  onNoClick(): void {
    this.dialogRef.close('');
  }

  onClick(): void {
    if (this.nouveauNomAnnonce === ''){
      this.errorMessage = 'Le nom de la nouvelle annonce est vide';
    }
    else {
      this.onSendRequest = true;
      if (this.imageAnnonce !== null){
        this.uploadImage().then(urlAdvert => {
          const data = {
            oldTitle: this.oldTitle,
            newImage: urlAdvert,
            newTitle: '',
            newDescription: ''
          };

          if (this.nouveauNomAnnonce !== ''){
            data.newTitle = this.nouveauNomAnnonce;
          }
          if (this.nouvelleDescription !== ''){
            data.newDescription = this.nouvelleDescription;
          }

          this.messageService.sendMessage( environment.debutUrlAdverts + '/updateAdvert', data).subscribe(
            retour => {
              this.dialogRef.close(retour.data);
            }
          );
        });
      }
      else {
        const data = {
          oldTitle: this.oldTitle,
          newImage: '',
          newTitle: '',
          newDescription: ''
        };

        if (this.nouveauNomAnnonce !== ''){
          data.newTitle = this.nouveauNomAnnonce;
        }
        if (this.nouvelleDescription !== ''){
          data.newDescription = this.nouvelleDescription;
        }

        this.messageService.sendMessage( environment.debutUrlAdverts + '/updateAdvert', data).subscribe(
          retour => {
            console.log(retour.data);
            this.dialogRef.close(retour.data);
          }
        );
      }
    }
  }

  async uploadImage(): Promise<any>{
    return new Promise((resolve, reject) => {
      const dataImg = new FormData();
      dataImg.append('Image', this.imageAnnonce);
      this.messageService.sendMessage( environment.debutUrlAdverts + '/sendImage', dataImg).subscribe(
        retour => {
          resolve(retour.data);
        }
      );
    });
  }
}
