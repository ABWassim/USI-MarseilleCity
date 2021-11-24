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
  searchw = this.route.snapshot.paramMap.get('searchword');
  listeVideos: Video[] = [];
  searchword = '';
  url = '';

  constructor(private msgservice: MessageService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getTrendings', null).subscribe(
      reponse => {
        this.listeVideos = reponse.data;
      }
    );
  }

  getVideos(i): void {
    this.url = '/search/' + this.searchword;
    this.router.navigateByUrl(this.url);
    const data = {
      query: this.searchword,
      page: i
    };
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideos', data).subscribe(
      reponse => {
        this.listeVideos = reponse.data;
      }
    );
  }

}
