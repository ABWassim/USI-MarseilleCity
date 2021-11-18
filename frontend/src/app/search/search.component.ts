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
  
  constructor(private msgservice: MessageService, private route: ActivatedRoute,private router: Router) { }
  // searchword: string= "";
  // url: string="";

  ngOnInit(): void {
    const data = {
      query: this.searchw
    };
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideos', data).subscribe(
      reponse => {
        this.listeVideos = reponse.data;
        console.log(this.listeVideos);
      }
    );
  }
  // affichage():void{
  //   this.url = "/search/" + this.searchword;
  //   this.router.navigateByUrl(this.url);
  // }

}
