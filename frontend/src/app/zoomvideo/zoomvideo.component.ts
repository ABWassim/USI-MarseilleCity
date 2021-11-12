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
  titleVideo = this.route.snapshot.paramMap.get('title');
  videozoom: any;
  urlVideoYoutube: string = "";
  urlVideoVimeo: string = "";

  constructor(private msgservice: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const data = {
      query: "nature"
    };
    this.msgservice.sendMessage( environment.debutUrlVideo + '/getVideo', data).subscribe(
      reponse => {
        this.videozoom = reponse.data;
        if (this.videozoom.platform == "Youtube"){
          this.urlVideoYoutube = "http://www.youtube.com/embed/" + this.videozoom.idVideo;
        }
        else{
          this.urlVideoVimeo = "https://player.vimeo.com/video/" + this.videozoom.idVideo;
        }
        console.log(this.videozoom);
      }
    );
  }

}
