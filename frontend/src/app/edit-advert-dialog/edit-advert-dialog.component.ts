import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-advert-dialog',
  templateUrl: './edit-advert-dialog.component.html',
  styleUrls: ['./edit-advert-dialog.component.scss']
})
export class EditAdvertDialogComponent implements OnInit {

  nouveauNomAnnonce = '';
  errorMessage = '';
  nouvelleDescription = '';

  constructor() { }

  ngOnInit(): void {
  }

  onNoClick() {

  }

  onClick() {

  }
}
