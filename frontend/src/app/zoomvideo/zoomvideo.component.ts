import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../message.service';
import { VideoComponent } from '../video/video.component';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-zoomvideo',
  templateUrl: './zoomvideo.component.html',
  styleUrls: ['./zoomvideo.component.scss']
})
export class ZoomvideoComponent implements OnInit {
  concat = this.route.snapshot.paramMap.get('id');
  videozoom: any;
  urlVideoYoutube: string = "";
  urlVideoVimeo: string = "";
  splitted = this.concat.split("-", 2); 
  idVideo = this.splitted[0];
  provide = this.splitted[1];


  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const data = {
      id: this.idVideo,
      provider : this.provide
    };
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideoById', data).subscribe(
      reponse => {
        this.videozoom = reponse.data;
        if (this.provide == "youtube"){
          this.urlVideoYoutube = "http://www.youtube.com/embed/" + this.videozoom.id;
        }
        else{
          this.urlVideoVimeo = "https://player.vimeo.com/video/" + this.videozoom.id;
        }
        console.log(this.videozoom);
      }
    );
  }

}
