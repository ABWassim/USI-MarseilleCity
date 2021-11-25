import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';
import { Video } from '../video/video.component';
import {UserqueryService} from '../userquery.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query = '';
  listeVideos: Video[] = [];
  url = '';
  pageNumber = 1;
  showSpinner = true;
  showPaginator = false;
  showVideos = false;

  constructor(private userquery: UserqueryService, private msgservice: MessageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.query = this.userquery.query;
    if (this.userquery.pageNumber === -1){
      this.msgservice.sendMessage( environment.debutUrlVideo + '/getTrendings', null).subscribe(
        reponse => {
          this.showSpinner = false;
          this.listeVideos = reponse.data;
          this.showPaginator = true;
          this.showVideos = true;
        }
      );
    }
    else {
      const data = {
        query: this.userquery.query,
        page: this.userquery.pageNumber
      };
      this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideos', data).subscribe(
        reponse => {
          this.showSpinner = false;
          this.listeVideos = reponse.data;
          this.showPaginator = true;
          this.showVideos = true;
        }
      );
    }
  }

  getVideos(i): void {
    this.pageNumber = i;
    this.showVideos = false;
    this.showPaginator = false;
    this.showSpinner = true;

    const data = {
      query: this.query,
      page: this.pageNumber
    };

    this.userquery.query = this.query;
    this.userquery.pageNumber = this.pageNumber;

    this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideos', data).subscribe(
      reponse => {
        this.listeVideos = reponse.data;
        this.showSpinner = false;
        this.showVideos = true;
        this.showPaginator = true;
      }
    );
  }

}
