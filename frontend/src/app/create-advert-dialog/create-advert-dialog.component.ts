import {Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-create-advert-dialog',
  templateUrl: './create-advert-dialog.component.html',
  styleUrls: ['./create-advert-dialog.component.scss']
})
export class CreateAdvertDialogComponent implements OnInit {

  nomNouvelleAnnonce = '';
  errorMessage = '';
  descriptionAnnonce = '';
  imageAnnonce: File = null;
  onSendRequest = false;
  advertExists = false;

  constructor(public dialogRef: MatDialogRef<CreateAdvertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(MessageService) private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onFileSelected(event): void{
    this.imageAnnonce = event.target.files[0];
  }

  onClick(): void {
    if (this.nomNouvelleAnnonce === ''){
      this.errorMessage = 'Le nom de la nouvelle annonce est vide';
    }
    else if (this.imageAnnonce === null){
      this.errorMessage = 'Veuillez rentrer une image';
    }
    else {
      this.onSendRequest = true;

      this.existingAdvert().then(b => {
        this.advertExists = b;
        if (!this.advertExists){
          this.uploadImage().then(urlAdvert => {
            const data2 = {
              title: this.nomNouvelleAnnonce,
              description: this.descriptionAnnonce,
              image: urlAdvert
            };

            this.messageService.sendMessage( environment.debutUrlAdverts + '/addAdvert', data2).subscribe(
              retour => {
                this.dialogRef.close(retour.data);
              }
            );
          });
        }
      });
    }
  }

  onNoClick(): void{
    this.dialogRef.close('');
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

  async existingAdvert(): Promise<any>{
    return new Promise((resolve, reject) => {
      const data = {
        title: this.nomNouvelleAnnonce
      };
      this.messageService.sendMessage( environment.debutUrlAdverts + '/existingAdvert', data).subscribe(
        retour => {
          if (retour.data){
            this.errorMessage = 'Ce nom est déjà utilisé pour une autre annonce';
            this.onSendRequest = false;
            resolve(true);
          }
          else {
            resolve(false);
          }
        }
      );
    });
  }
}
