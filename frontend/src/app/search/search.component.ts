import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';
import {UserqueryService} from '../userquery.service';
import {Video} from '../video';

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
    if (this.query === ''){
      const data = {
        page: this.userquery.pageNumber
      };
      this.msgservice.sendMessage( environment.debutUrlVideo + '/getTrendings', data).subscribe(
        reponse => {
          for (const d of reponse.data){
            d.title = d.title.replace(/&#39;/g, "'");
            d.title = d.title.replace(/&quot;/g, '"');
          }
          this.showSpinner = false;
          this.listeVideos = reponse.data;
          this.showPaginator = true;
          this.showVideos = true;
        }
      );
    }
    else {
      const data = {
        query: this.userquery.query.replace(/ /g, '+'),
        page: this.userquery.pageNumber
      };
      console.log(data.query);
      this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideos', data).subscribe(
        reponse => {
          for (const d of reponse.data){
            d.title = d.title.replace(/&#39;/g, "'");
            d.title = d.title.replace(/&quot;/g, '"');
          }
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

    this.userquery.query = this.query;
    this.userquery.pageNumber = this.pageNumber;

    if (this.userquery.query !== ''){
      const data = {
        query: this.userquery.query.replace(/ /g, '+'),
        page: this.userquery.pageNumber
      };
      this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideos', data).subscribe(
        reponse => {
          for (const d of reponse.data){
            d.title = d.title.replace(/&#39;/g, "'");
            d.title = d.title.replace(/&quot;/g, '"');
          }
          this.listeVideos = reponse.data;
          this.showSpinner = false;
          this.showVideos = true;
          this.showPaginator = true;
        }
      );
    }
    else {
      const data = {
        page: this.userquery.pageNumber
      };
      this.msgservice.sendMessage( environment.debutUrlVideo + '/getTrendings', data).subscribe(
        reponse => {
          for (const d of reponse.data){
            d.title = d.title.replace(/&#39;/g, "'");
            d.title = d.title.replace(/&quot;/g, '"');
          }
          this.showSpinner = false;
          this.listeVideos = reponse.data;
          this.showPaginator = true;
          this.showVideos = true;
        }
      );
    }
  }

}
