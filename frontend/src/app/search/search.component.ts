import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';
import { Video } from '../video/video.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchw = '';
  listeVideos: Video[] = [];
  searchword = '';
  url = '';
  showSpinner = true;
  showPaginator = false;
  showVideos = false;

  constructor(private msgservice: MessageService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getTrendings', null).subscribe(
      reponse => {
        this.showSpinner = false;
        this.listeVideos = reponse.data;
        this.showPaginator = true;
        this.showVideos = true;
      }
    );
  }

  getVideos(i): void {
    this.showVideos = false;
    this.showPaginator = false;
    this.showSpinner = true;

    const data = {
      query: this.searchword,
      page: i
    };
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
